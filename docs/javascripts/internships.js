// ============================================
// CISC INTERNSHIPS & OPPORTUNITIES
// Google Sheets Integration
// ============================================

(() => {
    "use strict";

    const API_URL =
        "https://script.google.com/macros/s/AKfycbzFPvMOzxYkziflBIrl2Sq7SrBUI-7Q61MOzjm6tXG-H2XfoWTUxe9CyqlKBTML9AI4/exec";
    const DAYS_NEW = 7;
    let requestCounter = 0;
    let activeCancel = null;

    // ============================================
    // DATE UTILITIES
    // ============================================

    function parseDay(value) {
        if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
        return date;
    }

    function dayNumber(date) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000;
    }

    function todayNumber() { return dayNumber(new Date()); }

    function daysRemaining(value) {
        const date = parseDay(value);
        return date ? dayNumber(date) - todayNumber() : null;
    }

    function displayDate(value) {
        const date = parseDay(value);
        return date ? date.toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric"
        }) : "Not specified";
    }

    function compactDate(date) {
        return String(date.getFullYear()) +
            String(date.getMonth() + 1).padStart(2, "0") +
            String(date.getDate()).padStart(2, "0");
    }

    // ============================================
    // DOM AND URL UTILITIES
    // ============================================

    function make(tag, className = "", text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function safeUrl(value) {
        try {
            const url = new URL(value);
            return ["https:", "http:"].includes(url.protocol) ? url.href : null;
        } catch (_) {
            return null;
        }
    }

    // ============================================
    // CALENDAR ICONS (self-contained SVGs)
    // ============================================
    // Google Calendar-style icon and Apple Calendar-style icon.
    // No external image hosting or MkDocs asset paths required.

    const CALENDAR_ICONS = {
        google: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
            <path fill="#4285F4" d="M6 2h20a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z"/>
            <path fill="#34A853" d="M2 11h7v19H6a4 4 0 0 1-4-4z"/>
            <path fill="#FBBC04" d="M23 23h7v3a4 4 0 0 1-4 4h-3z"/>
            <path fill="#EA4335" d="M6 2h20a4 4 0 0 1 4 4v5H2V6a4 4 0 0 1 4-4z"/>
            <rect x="8" y="8" width="17" height="16" rx="1.5" fill="#fff"/>
            <text x="16.5" y="20.3" fill="#4285F4" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="11">31</text>
        </svg>`,
        apple: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#fff" stroke="#d4d7dc" stroke-width="1.2"/>
            <path d="M8 2h16a6 6 0 0 1 6 6v3H2V8a6 6 0 0 1 6-6z" fill="#f44336"/>
            <text x="16" y="9" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="6">CAL</text>
            <text x="16" y="24" fill="#222" text-anchor="middle" font-family="Arial,sans-serif" font-weight="600" font-size="16">17</text>
        </svg>`
    };

    function calendarIcon(type, deadlineDay) {
        const span = make("span", "io-calendar-logo");
        // SVG markup is a fixed constant, not sourced from Google Sheets.
        span.innerHTML = CALENDAR_ICONS[type];

        // Show the actual application deadline day on both icons.
        const dayText = span.querySelector("svg text:last-of-type");
        if (dayText) dayText.textContent = String(deadlineDay);

        span.setAttribute("aria-hidden", "true");
        return span;
    }

    // ============================================
    // GOOGLE CALENDAR
    // ============================================

    function googleCalendarUrl(item) {
        const date = parseDay(item.deadline);
        if (!date) return null;
        const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: `Application Deadline: ${item.opportunity || "Internship"}`,
            dates: `${compactDate(date)}/${compactDate(next)}`,
            details: `${item.organization || ""}\n${safeUrl(item.details) || ""}`
        });
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    // ============================================
    // APPLE CALENDAR (.ics download)
    // ============================================

    function escapeIcs(value) {
        return String(value || "")
            .replace(/\\/g, "\\\\")
            .replace(/\r\n|\r|\n/g, "\\n")
            .replace(/;/g, "\\;")
            .replace(/,/g, "\\,");
    }

    function downloadAppleCalendar(item) {
        const date = parseDay(item.deadline);
        if (!date) return;
        const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
        const eventId = String(item.id || item.opportunity || "internship")
            .replace(/[^a-zA-Z0-9_-]/g, "-");
        const uid = `${compactDate(date)}-${eventId}@cisc-courses`;
        const lines = [
            "BEGIN:VCALENDAR", "VERSION:2.0", "CALSCALE:GREGORIAN",
            "PRODID:-//CISC Courses//Internship Deadlines//EN",
            "BEGIN:VEVENT", `UID:${uid}`, `DTSTAMP:${stamp}`,
            `DTSTART;VALUE=DATE:${compactDate(date)}`,
            `DTEND;VALUE=DATE:${compactDate(next)}`,
            `SUMMARY:${escapeIcs(`Application Deadline: ${item.opportunity || "Internship"}`)}`,
            `DESCRIPTION:${escapeIcs(`${item.organization || ""}\n${safeUrl(item.details) || ""}`)}`,
            "BEGIN:VALARM", "ACTION:DISPLAY",
            "DESCRIPTION:Internship application deadline tomorrow",
            "TRIGGER:-P1D", "END:VALARM",
            "END:VEVENT", "END:VCALENDAR"
        ];
        const blob = new Blob([lines.join("\r\n") + "\r\n"], {
            type: "text/calendar;charset=utf-8"
        });
        const objectUrl = URL.createObjectURL(blob);
        const anchor = make("a");
        anchor.href = objectUrl;
        anchor.download = `internship-${eventId}.ics`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    }

    // ============================================
    // BADGES AND SORTING
    // ============================================

    function badge(text, type) { return make("span", `io-badge ${type}`, text); }

    function timeBadge(days) {
        if (days === null) return badge("—", "io-neutral");
        if (days < 0) return badge("Expired", "io-expired");
        if (days === 0) return badge("Due Today", "io-urgent");
        const text = `${days} day${days === 1 ? "" : "s"}`;
        return badge(text, days <= 7 ? "io-urgent" : days <= 30 ? "io-soon" : "io-future");
    }

    function sortInternships(items) {
        return [...items].sort((a, b) => {
            const aDays = daysRemaining(a.deadline);
            const bDays = daysRemaining(b.deadline);
            const group = days => days === null ? 1 : days < 0 ? 2 : 0;
            const difference = group(aDays) - group(bDays);
            if (difference !== 0) return difference;
            if (aDays !== null && bDays !== null && aDays !== bDays) {
                return group(aDays) === 2 ? bDays - aDays : aDays - bDays;
            }
            return String(a.organization || "").localeCompare(String(b.organization || ""));
        });
    }

    // ============================================
    // FETCH GOOGLE SHEETS USING JSONP
    // ============================================

    function loadInternships() {
        return new Promise((resolve, reject) => {
            const callbackName = `ciscInternships${Date.now()}_${++requestCounter}`;
            const script = make("script");
            let completed = false;
            const timeout = setTimeout(() => finish(new Error("Internship request timed out.")), 15000);

            function finish(error, result) {
                if (completed) return;
                completed = true;
                clearTimeout(timeout);
                script.remove();
                delete window[callbackName];
                if (activeCancel === cancelRequest) activeCancel = null;
                if (error) reject(error);
                else resolve(result);
            }

            function cancelRequest() { finish(new Error("Navigation changed.")); }
            window[callbackName] = data => finish(null, data);
            script.onerror = () => finish(new Error("Unable to connect to Google Sheets."));
            activeCancel = cancelRequest;
            script.src = API_URL + (API_URL.includes("?") ? "&" : "?") +
                "callback=" + encodeURIComponent(callbackName);
            document.head.appendChild(script);
        });
    }

    // ============================================
    // BUILD INTERNSHIP DIRECTORY
    // ============================================

    function displayInternships(container, internships) {
        container.replaceChildren();
        const controls = make("div", "io-controls");
        const search = make("input", "io-search");
        search.type = "search";
        search.placeholder = "Search by organization, opportunity, eligibility, or location...";
        search.setAttribute("aria-label", "Search internship opportunities");
        controls.appendChild(search);

        const resetButton = make("button", "io-reset", "Clear");
        resetButton.type = "button";
        controls.appendChild(resetButton);

        const resultCount = make("p", "io-result-count");
        const tableContainer = make("div", "io-table-scroll");
        const table = make("table", "io-table");
        table.appendChild(make("caption", "io-sr-only", "Internship and opportunity listings"));
        const thead = make("thead");
        const headerRow = make("tr");
        const headings = ["Organization", "Opportunity", "Eligibility", "Location", "Deadline", "Days Left"];
        headings.forEach(h => headerRow.appendChild(make("th", "", h)));
        thead.appendChild(headerRow);
        table.appendChild(thead);
        const tbody = make("tbody");
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        container.append(controls, resultCount, tableContainer);

        function refreshTable() {
            const query = search.value.trim().toLowerCase();
            const filtered = sortInternships(internships).filter(item => {
                const searchable = [item.organization, item.opportunity, item.eligibility, item.location]
                    .join(" ").toLowerCase();
                return searchable.includes(query);
            });
            tbody.replaceChildren();
            resultCount.textContent = `${filtered.length} opportunit${filtered.length === 1 ? "y" : "ies"} shown`;

            filtered.forEach(item => {
                const row = make("tr");
                const addCell = (text = "") => {
                    const cell = make("td", "", text);
                    row.appendChild(cell);
                    return cell;
                };

                addCell(item.organization || "Not specified").classList.add("io-org");

                const opportunityCell = addCell();
                const url = safeUrl(item.details);
                const opportunityLink = make(url ? "a" : "span", "io-opportunity", item.opportunity || "Untitled");
                if (url) {
                    opportunityLink.href = url;
                    opportunityLink.target = "_blank";
                    opportunityLink.rel = "noopener noreferrer";
                }
                const added = parseDay(item.dateAdded);
                const age = added ? todayNumber() - dayNumber(added) : null;
                if (age !== null && age >= 0 && age < DAYS_NEW) {
                    opportunityCell.appendChild(badge("NEW", "io-new"));
                }
                const wrapper = make("div", "io-opportunity-wrapper");
                wrapper.appendChild(opportunityLink);
                opportunityCell.appendChild(wrapper);

                addCell().appendChild(badge(item.eligibility || "Not specified", "io-eligibility"));
                addCell(item.location || "Not specified");

                // Deadline with Google and Apple Calendar icon links.
                const deadlineCell = addCell();
                deadlineCell.appendChild(make("div", "io-deadline-date", displayDate(item.deadline)));
                const days = daysRemaining(item.deadline);
                if (days !== null && days >= 0) {
                    const options = make("div", "io-calendar-options");
                    const google = make("a", "io-calendar-link io-google-calendar");
                    google.href = googleCalendarUrl(item);
                    google.target = "_blank";
                    google.rel = "noopener noreferrer";
                    google.title = "Add deadline to Google Calendar";
                    google.setAttribute("aria-label", `Add ${item.opportunity} deadline to Google Calendar`);
                    google.appendChild(calendarIcon("google", parseDay(item.deadline).getDate()));

                    const apple = make("a", "io-calendar-link io-apple-calendar");
                    apple.href = "#";
                    apple.title = "Download deadline for Apple Calendar";
                    apple.setAttribute("aria-label", `Download ${item.opportunity} deadline for Apple Calendar`);
                    apple.appendChild(calendarIcon("apple", parseDay(item.deadline).getDate()));
                    apple.addEventListener("click", event => {
                        event.preventDefault();
                        downloadAppleCalendar(item);
                    });
                    options.append(google, apple);
                    deadlineCell.appendChild(options);
                }

                addCell().appendChild(timeBadge(days));
                tbody.appendChild(row);
            });

            if (filtered.length === 0) {
                const row = make("tr");
                const cell = make("td", "io-empty", "No opportunities match your filters.");
                cell.colSpan = headings.length;
                row.appendChild(cell);
                tbody.appendChild(row);
            }
        }

        search.addEventListener("input", refreshTable);
        resetButton.addEventListener("click", () => {
            search.value = "";
            refreshTable();
        });
        refreshTable();
    }

    // ============================================
    // INITIALIZE / MKDOCS MATERIAL NAVIGATION
    // ============================================

    async function initializeInternships() {
        if (activeCancel) activeCancel();
        const container = document.getElementById("internship-directory");
        if (!container) return;
        container.textContent = "Loading internship opportunities...";
        try {
            const data = await loadInternships();
            if (!container.isConnected) return;
            if (!data || !Array.isArray(data.internships)) {
                throw new Error("Unexpected internship data format.");
            }
            displayInternships(container, data.internships);
        } catch (error) {
            if (!container.isConnected || error.message === "Navigation changed.") return;
            console.error("Internship directory:", error);
            container.textContent = "Unable to load internship opportunities. Please refresh the page.";
        }
    }

    if (typeof document$ !== "undefined") {
        document$.subscribe(initializeInternships);
    } else if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeInternships);
    } else {
        initializeInternships();
    }
})();
