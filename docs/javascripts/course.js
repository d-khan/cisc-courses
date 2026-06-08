document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "Course Dashboard Loaded"
        );

        // =====================================
        // GET SEMESTER DATES
        // =====================================

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

        semesterStart.setHours(0,0,0,0);
        semesterEnd.setHours(0,0,0,0);

        // =====================================
        // WEEK CALCULATION
        // =====================================

        function getSemesterWeek(
            semesterStart,
            currentDate
        ) {

            const start =
                new Date(semesterStart);

            const current =
                new Date(currentDate);

            start.setHours(0, 0, 0, 0);
            current.setHours(0, 0, 0, 0);

            const diffDays =
                Math.floor(
                    (current - start) /
                    (1000 * 60 * 60 * 24)
                );

            return Math.floor(
                diffDays / 7
            ) + 1;
        }

        today.setHours(
            0, 0, 0, 0
        );

        const semesterNotStarted =
            today < semesterStart;

        const semesterEnded =
            today > semesterEnd;

        const semesterActive =
            !semesterNotStarted &&
            !semesterEnded;

        if (
            semesterNotStarted ||
            semesterEnded
        ) {

            const message =

                semesterNotStarted

                    ? "Semester Not Started"

                    : "Semester Not In Session";

            document.querySelector(
                ".topic-section"
            ).innerHTML = `

        <div
            style="
                width:100%;
                text-align:center;
                padding:50px 20px;
                font-size:3rem;
                font-weight:700;
            "
        >
            ${message}
        </div>

    `;
            document.getElementById(
                "announcements-card"
            ).style.display = "none";

            document.getElementById(
                "upcoming-card"
            ).style.display = "none";
        }

        let week = "";

        if (semesterActive) {

            week = `Week ${getSemesterWeek(
                semesterStart,
                today
            )}`;
        }

        // =====================================
        // DATE INFO
        // =====================================

        const month =
            today
                .toLocaleDateString(
                    "en-US",
                    {
                        month: "short"
                    }
                )
                .toUpperCase();

        const day =
            today.getDate();

        const weekday =
            today
                .toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                )
                .toUpperCase();

        // =====================================
        // RENDER CALENDAR CARD
        // =====================================

        const courseDate =
            document.getElementById(
                "course-date"
            );

        if (!courseDate) {

            console.error(
                "course-date element not found"
            );

            return;
        }

        const footerHtml =
            week
                ? `<div class="calendar-footer">${week}</div>`
                : "";

        courseDate.innerHTML = `

            <div class="calendar-card">

                <div class="calendar-month">
                    ${month}
                </div>

                <div class="calendar-day">
                    ${day}
                </div>

                <div class="calendar-weekday">
                    ${weekday}
                </div>

                ${footerHtml}

            </div>

        `;

// =====================================
// LOAD COURSE DATA
// =====================================

        const rows =
            await loadCourseData();

        console.log(rows);

        console.log("Rows returned:");
        console.log(
            "First row:",
            rows[0]
        );

        console.log("Semester Start:", semesterStart);
        console.log("Today:", today);

        const currentWeek =
            getSemesterWeek(
                semesterStart,
                today
            );

        console.log("Today:", today);
        console.log("Current Week:", currentWeek);

        const currentLecture =
            rows.find(row =>
                row.type === "Lecture" &&
                getSemesterWeek(
                    semesterStart,
                    row.date + "T00:00:00"
                ) === currentWeek
            );

        console.log(
            "Current Lecture:",
            currentLecture
        );

        if (semesterActive) {

            document.getElementById(
                "current-topic"
            ).textContent =
                currentLecture?.item ||
                "No lecture scheduled this week";
        }

        const lectures =
            rows
                .filter(
                    row => row.type === "Lecture"
                )
                .sort(
                    (a, b) =>
                        new Date(a.date + "T00:00:00") -
                        new Date(b.date + "T00:00:00")
                );

        console.log("Lectures:");
        lectures.forEach(lecture => {
            console.log(
                lecture.item,
                lecture.date,
                getSemesterWeek(
                    semesterStart,
                    lecture.date + "T00:00:00"
                )
            );
        });

        if (!semesterEnded) {

            const nextLecture =
                lectures.find(
                    lecture =>
                        new Date(
                            lecture.date + "T00:00:00"
                        ) > today
                );

            console.log("Today:", today);
            console.log("Next Lecture:", nextLecture);

            if (nextLecture) {

                const nextWeekNumber =
                    getSemesterWeek(
                        semesterStart,
                        nextLecture.date + "T00:00:00"
                    );

                document.getElementById(
                    "next-topic-label"
                ).textContent =
                    `WEEK ${nextWeekNumber} TOPIC`;

                document.getElementById(
                    "next-topic"
                ).textContent =
                    nextLecture.item;

            } else {

                document.getElementById(
                    "next-topic-label"
                ).textContent =
                    "UPCOMING TOPIC";

                document.getElementById(
                    "next-topic"
                ).textContent =
                    "No upcoming topic";
            }
        }

        console.log("Current Week:", currentWeek);
        console.log("All Rows:", rows);

        rows.forEach(row => {

            if (row.type === "Info") {

                console.log(
                    "INFO:",
                    row.item,
                    row.date,
                    getSemesterWeek(
                        semesterStart,
                        row.date + "T00:00:00"
                    )
                );

            }

        });

        const announcements =
            rows.filter(row =>
                row.type === "Info" &&
                getSemesterWeek(
                    semesterStart,
                    row.date + "T00:00:00"
                ) === currentWeek
            );

        console.log("Announcements:", announcements);

        const announcementsContainer =
            document.getElementById(
                "announcements"
            );

        announcementsContainer.innerHTML = "";

        if (announcements.length === 0) {

            announcementsContainer.innerHTML = `

        <div class="announcement-item">

            <div class="announcement-icon">
                ⓘ
            </div>

            <div>
                    "No announcements this week."
            </div>

        </div>

    `;

        } else {

            announcements.forEach(
                announcement => {

                    announcementsContainer.innerHTML += `

                <div class="announcement-item">

                    <div class="announcement-icon">
                        ⓘ
                    </div>

                    <div>
                        ${announcement.item}
                    </div>

                </div>

            `;
                }
            );
        }
// =====================================
// WHAT'S COMING UP (NEXT 14 DAYS)
// =====================================

        const fourteenDaysLater =

            new Date(today);

        fourteenDaysLater.setDate(
            today.getDate() + 14
        );
        const upcoming =
            rows.filter(row => {

                if (
                    row.type !== "Assessment"
                ) {
                    return false;
                }

                const itemDate =
                    new Date(
                        row.date + "T00:00:00"
                    );

                return (
                    itemDate >= today &&
                    itemDate <= fourteenDaysLater
                );
            });

        const upcomingContainer =
            document.getElementById(
                "upcoming"
            );

        upcomingContainer.innerHTML = "";

        if (upcoming.length === 0) {

            upcomingContainer.innerHTML = `

        <div class="upcoming-item">

            <div>
                    "No assessments due in the next 14 days."
            </div>

        </div>

    `;

        } else {

            upcoming.forEach(item => {

                const itemDate =
                    new Date(
                        item.date + "T00:00:00"
                    );

                const month =
                    itemDate
                        .toLocaleDateString(
                            "en-US",
                            {
                                month: "short"
                            }
                        )
                        .toUpperCase();

                const day =
                    itemDate.getDate();

                upcomingContainer.innerHTML += `

            <div class="upcoming-item">

                <div class="date-box green">

                    ${month}
                    <br>
                    ${day}

                </div>

                <div>

                    <strong>
                        ${item.item}
                    </strong>

                    <br>

                    ${item.time || ""}

                </div>

            </div>

        `;
            });
        }
    }
);


// =====================================
// LOAD COURSE DATA
// =====================================

async function loadCourseData() {

    console.log("Loading course data...");

    const response =
        await fetch(
            "https://script.google.com/macros/s/AKfycbz-8FZjJLCCkgNRKlWdVS55Z03DwJrQfNVtE6Xjc9HMuKP2Dl-XEK5QTc18v_XmmrnD/exec"
        );

    console.log("Fetch completed");

    const data =
        await response.json();

    console.log("JSON parsed");

    return data;
}