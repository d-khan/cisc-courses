document.addEventListener("DOMContentLoaded", async function () {

    function getSemesterWeek(
        semesterStart,
        currentDate
    ) {

        const start =
            new Date(semesterStart);

        const current =
            new Date(currentDate);

        start.setHours(0,0,0,0);
        current.setHours(0,0,0,0);

        const diffDays =
            Math.floor(
                (current - start) /
                (1000 * 60 * 60 * 24)
            );

        return Math.floor(diffDays / 7) + 1;
    }

    // =========================================
    // Semester Configuration
    // =========================================

    // Months are zero-indexed:
    // Here the month 7 is not July, but August and month 11 is not November, but December.

// =========================================
// LOAD SEMESTER INFO
// =========================================

// =========================================
// SEMESTER DATES
// =========================================

    const semesterStart =
        new Date(
            window.semesterConfig.semesterStart +
            "T00:00:00"
        );

    const semesterEnd =
        new Date(
            window.semesterConfig.semesterEnd +
            "T00:00:00"
        );


    const today =
        window.semesterConfig.today
            ? new Date(
                window.semesterConfig.today +
                "T00:00:00"
            )
            : new Date();

    today.setHours(0,0,0,0);

    // =========================================
    // Semester Progress Calculation
    // =========================================

    const totalSemesterDuration = semesterEnd - semesterStart;

    const elapsedSemesterDuration =
        Math.max(0, today - semesterStart);

    const semesterProgress = Math.min(
        100,
        Math.max(
            0,
            Math.round((elapsedSemesterDuration / totalSemesterDuration) * 100),
        ),
    );

    // =========================================
    // Semester Name
    // =========================================

    const startMonth = semesterStart.getMonth() + 1;

    let semesterName = "";

    if (startMonth === 8) {
        semesterName = "Fall";
    } else if (startMonth === 2) {
        semesterName = "Spring";
    } else {
        semesterName = "Summer";
    }

    const year = semesterStart.getFullYear();

    let semesterEvents = [];


    async function loadSemesterEvents() {

        try {

            const response =
                await fetch(
                    "https://script.google.com/macros/s/AKfycbxRsdt71lqxWNqtKSuwpwYKudSPKLi8ne1EF-2lzp6mzgEugwopJNl8MPtRYLuH5482lw/exec?action=events"
                );

            if (!response.ok) {
                throw new Error("Unable to load events");
            }

            return await response.json();

        } catch (error) {

            console.error(error);

            return [];
        }
    }

    // =========================================
    // Dashboard Content
    // =========================================

    let number = "";
    let label = "";
    let message = "";


// =====================================
// FETCH LIVE DASHBOARD DATA
// =====================================

    async function loadDashboardMetrics() {

        const pendingCount =
            document.getElementById(
                "pending-count"
            );

        const avgResponse =
            document.getElementById(
                "avg-response"
            );

        if (!pendingCount && !avgResponse) {
            return;
        }

        try {

            const response =
                await fetch(
                    "https://script.google.com/macros/s/AKfycbxRsdt71lqxWNqtKSuwpwYKudSPKLi8ne1EF-2lzp6mzgEugwopJNl8MPtRYLuH5482lw/exec?action=dashboard"
                );

            const data =
                await response.json();

            if (pendingCount) {
                pendingCount.innerText =
                    data.pending;
            }

            if (avgResponse) {
                avgResponse.innerText =
                    data.avgResponse;
            }

        } catch (error) {

            console.error(error);

            if (pendingCount) {
                pendingCount.innerText = "-";
            }
        }
    }

// =====================================
// INITIAL LOAD
// =====================================

    loadDashboardMetrics();
    const eventsPromise =

        loadSemesterEvents();

// =====================================
// AUTO REFRESH EVERY 120 SECONDS
// =====================================

    const refreshTimer =
        document.getElementById(
            "refresh-timer"
        );

    if (refreshTimer) {

        let refreshCountdown = 120;

        setInterval(function () {

            refreshCountdown--;

            refreshTimer.innerText =
                "Refreshing in " +
                refreshCountdown +
                "s";

            if (refreshCountdown <= 0) {

                loadDashboardMetrics();

                refreshCountdown = 120;
            }

        }, 1000);
    }

    if (today < semesterStart) {

        const diffTime = semesterStart - today;
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        number = days;
        label = "DAY(S)";

        message = `
            Semester begins on
            <br>
            <span class="highlight-date">
                ${semesterStart.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        })}
            </span>
`;
    } else if (today > semesterEnd) {
        number = "✓";
        label = "COMPLETE";

        message = `
            Semester has ended
        `;
    } else {

            const week =
                getSemesterWeek(
                    semesterStart,
                    today
                );

            number = week;

            label = "WEEK";

            message = `

    <div>

        <div style="
            font-size: 1rem;
            letter-spacing: 2px;
            color: #666;
            margin-bottom: 0.75rem;
            font-weight: 700;
        ">
            THIS WEEK
        </div>

        <div
            id="this-week-events"
            style="
                display:flex;
                flex-direction:column;
                gap:0.5rem;
            "
        >

            <div style="
                background:#f5f7fb;
                padding:0.65rem 0.9rem;
                border-radius:10px;
                border-left:4px solid #1976d2;
                text-align:left;
                font-size:1rem;
            ">
                Loading events...
            </div>

        </div>

    </div>

    `;
        }


    // =========================================
    // Semester Date Formatting
    // =========================================

    const startFormatted = semesterStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const endFormatted = semesterEnd.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    // =========================================
    // Render Dashboard
    // =========================================

    console.log(
        document.getElementById(
            "semester-status"
        )
    );

    document.getElementById("semester-status").innerHTML = `

    <style>

        .dashboard-card {
            max-width: 1200px;
            margin: 2rem 0;
            border-radius: 20px;
            overflow: hidden;
            background: white;
            box-shadow: 0 10px 25px rgba(0,0,0,0.10);
            font-family: Arial, sans-serif;
            position: relative;
            top: -44px;
            transform-origin: top center;
        }
        

        /* ===================================== */
        /* HEADER                                */
        /* ===================================== */

        .dashboard-header {
            background: linear-gradient(135deg, #0d3c91, #1976d2);
            color: white;
            padding: 2rem 2.5rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        /*.calendar-circle {
            width: 95px; 
            height: 95px;
            border-radius: 50%;
            background: rgba(255,255,255,0.12);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.8rem;
            flex-shrink: 0;
        }*/

        .calendar-icon {
            width: 64px;
            border-radius: 10px;
            overflow: hidden;
            background: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .calendar-month {
            background: #e53935;
            color: white;
            text-align: center;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.25rem 0;
            letter-spacing: 1px;
        }

        .calendar-day {
            background: white;
            color: #222;
            text-align: center;
            font-size: 1.8rem;
            font-weight: 700;
            padding: 0.45rem 0;
            line-height: 1;
        }
    
        .header-divider {
            width: 2px;
            height: 110px;
            background: rgba(255,255,255,0.25);
        }

        .semester-status {
            font-size: 0.9rem;
            letter-spacing: 4px;
            opacity: 0.85;
            margin-bottom: 0.75rem;
        }

        .semester-title {
            font-size: 3.6rem;
            font-weight: 700;
            line-height: 1;
        }

        .progress-container {
            width: 180px;
            margin-top: 0.5rem;
        }

        .progress-title {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 1.5px;
            color: #666;
            margin-bottom: 0.4rem;
        }

        .progress-bar {
            width: 100%;
            height: 10px;
            background: #dfe5f2;
            border-radius: 999px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #0d47a1, #1976d2);
            border-radius: 999px;
            transition: width 0.4s ease;
        }

        .progress-text {
            margin-top: 0.35rem;
            font-size: 0.75rem;
            color: #555;
        }


        /* ===================================== */
        /* BODY                                  */
        /* ===================================== */

        .dashboard-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            padding: 2rem 2.5rem;
            background: white;
            flex-wrap: wrap;
        }

        .body-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 1.5rem;
        }

        .hourglass-circle {
            width: 95px;
            height: 95px;
            border-radius: 50%;
            background: #eef3ff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            color: #0d47a1;
        }

        .body-number-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0d47a1;
            letter-spacing: 2px;
        }

        .body-number {
            font-size: 3.8rem;
            font-weight: 700;
            line-height: 1;
            color: #0d47a1;
        }

        .body-number-label {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0d47a1;
            letter-spacing: 2px;
        }

        .body-divider {
            width: 2px;
            height: 220px;
            background: #e5e5e5;
        }

        .body-message {
            flex: 1;
            min-width: 260px;
            font-size: 1.5rem;
            line-height: 1.5;
            color: #222;
            text-align: center;
        }

        .highlight-date {
            color: #0d47a1;
            font-weight: 700;
        }

        /* ===================================== */
        /* FOOTER                                */
        /* ===================================== */

        .dashboard-footer {
            border-top: 1px solid #e5e5e5;
            background: #fafafa;
            padding: 1rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-wrap: wrap;
            gap: 1rem;
            color: #444;
            font-size: 0.95rem;
        }

    </style>

    <div class="dashboard-card">

        <!-- HEADER -->

        <div class="dashboard-header">

            <div class="calendar-circle">

                <div class="calendar-icon">

                    <div class="calendar-month">
                        ${today
        .toLocaleDateString("en-US", {
            month: "short",
        })
        .toUpperCase()}
                    </div>

                    <div class="calendar-day">
                        ${today.getDate()}
                    </div>

                </div>

            </div>
            

            <div class="header-divider"></div>

            <div>

                <div class="semester-status">
                    SEMESTER STATUS
                </div>

                <div class="semester-title">
                    ${semesterName} ${year}
                </div>

            </div>

        </div>

        <!-- BODY -->

        <div class="dashboard-body">

            <div class="body-left">

                <div>

                    <div class="body-number-title">
                        ${today < semesterStart ? "BEGINS IN" : "CURRENT"}
                    </div>

                    <div class="body-number">
                        ${number}
                    </div>

                    <div class="body-number-label">
                        ${label}
                    </div>

                    ${
        today >= semesterStart && today <= semesterEnd
            ? `

                    <div class="progress-container">

                        <div class="progress-title">
                            SEMESTER PROGRESS
                        </div>

                        <div class="progress-bar">

                            <div class="progress-fill"
                                style="width:${semesterProgress}%">
                            </div>

                        </div>

                        <div class="progress-text">
                            ${semesterProgress}% Complete
                        </div>
                    </div>
                    `
            : ""
    }

                </div>

            </div>

            <div class="body-divider"></div>

            <div class="body-message">
                ${message}
            </div>

        </div>

        <!-- FOOTER -->

        <div class="dashboard-footer">

            <div>
                <b>Semester duration:</b> ${startFormatted} – ${endFormatted}
            </div>

            <div>
                Stay tuned for announcements and updates.
            </div>

        </div>

    </div>
    `;

    if (
        today >= semesterStart &&
        today <= semesterEnd
    ) {

        eventsPromise
            .then(function(events) {

                const week =
                    getSemesterWeek(
                        semesterStart,
                        today
                    );

                const currentEvents =

                    events

                        .filter(event => {

                            const eventDate =
                                new Date(event.date);

                            return (
                                getSemesterWeek(
                                    semesterStart,
                                    eventDate
                                ) === week
                            );
                        })

                        .map(event => {

                            const formattedDate =

                                new Date(event.date)
                                    .toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric"
                                        }
                                    );

                            return `
                            <div style="
                                background:#f5f7fb;
                                padding:0.65rem 0.9rem;
                                border-radius:10px;
                                border-left:4px solid #1976d2;
                                text-align:left;
                                font-size:1rem;
                            ">
                                ${formattedDate}: ${event.eventName}
                            </div>
                        `;
                        });

                document.getElementById(
                    "this-week-events"
                ).innerHTML =

                    currentEvents.length
                        ? currentEvents.join("")
                        : `
                        <div style="
                            background:#f5f7fb;
                            padding:0.65rem 0.9rem;
                            border-radius:10px;
                            border-left:4px solid #1976d2;
                            text-align:left;
                            font-size:1rem;
                        ">
                            No major event this week
                        </div>
                    `;
            })

            .catch(function() {

                document.getElementById(
                    "this-week-events"
                ).innerHTML = `
                <div style="
                    background:#f5f7fb;
                    padding:0.65rem 0.9rem;
                    border-radius:10px;
                    border-left:4px solid #e53935;
                    text-align:left;
                    font-size:1rem;
                ">
                    Unable to load events
                </div>
            `;
            });
    }
    // =====================================
    // SHOW TICKET RESULT
    // =====================================

    window.showTicketResult = function () {
        const box = document.getElementById("ticket-result");

        box.classList.add("show");
    };

    // =====================================
    // TOGGLE LOOKUP
    // =====================================

    window.toggleTicketLookup = function () {
        const box = document.getElementById("ticket-lookup-box");

        if (box.style.display === "block") {
            box.style.display = "none";
        } else {
            box.style.display = "block";
        }
    };

// =====================================
// TICKET LOOKUP
// =====================================

    document
        .getElementById("ticket-search-button")
        .addEventListener(
            "click",
            async function () {

                try {

                    const ticket =
                        document
                            .getElementById("ticket-input")
                            .value
                            .trim();
                    if (!ticket) {

                        document

                            .getElementById(
                                "ticket-result-title"
                            )

                            .innerText =

                            "Enter ticket number";

                        document

                            .getElementById(
                                "ticket-result-text"
                            )

                            .innerText =

                            "";

                        document

                            .getElementById(
                                "ticket-result-box"
                            )

                            .classList.add("show");

                        return;

                    }

// =====================================
// SEND TO APPS SCRIPT
// =====================================

                    const response =
                        await fetch(
                            "https://script.google.com/macros/s/AKfycbxRsdt71lqxWNqtKSuwpwYKudSPKLi8ne1EF-2lzp6mzgEugwopJNl8MPtRYLuH5482lw/exec?ticket=" +
                            encodeURIComponent(ticket)
                        );

// =====================================
// CHECK RESPONSE
// =====================================

                    if (!response.ok) {

                        throw new Error(
                            "Server request failed"
                        );
                    }

// =====================================
// GET JSON RESULT
// =====================================

                    const result =
                        await response.json();

// =====================================
// UPDATE RESULT BOX
// =====================================

                    if (result.found) {

                        document
                            .getElementById(
                                "ticket-result-title"
                            )
                            .innerText =
                            "Ticket " +
                            result.ticketId +
                            " is " +
                            result.status;

                        let details = "";

                        if (result.status !== "Pending") {

                            details +=
                                "Resolved on: " +
                                (result.resolvedTime || "N/A");
                        }

                        if (result.notes) {

                            if (details !== "") {

                                details += "\n\n";
                            }

                            details += result.notes;
                        }

                        document
                            .getElementById(
                                "ticket-result-text"
                            )
                            .innerText = details;

                    } else {

                        document
                            .getElementById(
                                "ticket-result-title"
                            )
                            .innerText =
                            "Ticket not found";

                        document
                            .getElementById(
                                "ticket-result-text"
                            )
                            .innerText = "";
                    }

// =====================================
// SHOW RESULT
// =====================================

                    document
                        .getElementById(
                            "ticket-result-box"
                        )
                        .classList.add("show");

                } catch (error) {

                    document
                        .getElementById(
                            "ticket-result-title"
                        )
                        .innerText =
                        "Connection error";

                    document
                        .getElementById(
                            "ticket-result-text"
                        )
                        .innerText =
                        "Unable to retrieve ticket.";
                    document
                        .getElementById(
                            "ticket-result-box"
                        )
                        .classList.add("show");

                    console.error(error);
                }
            }
        );
});