<script src="/javascripts/dashboard.js"></script>

<div class="dashboard-layout">

    <div id="semester-status"></div>

    <div class="support-card">

        <div class="support-title">
            Course&nbsp;Support
        </div>

        <div class="support-text">
            Technical issues, add code requests, and 
            other course-related questions.
        </div>

        <div class="ticket-status-row">
            <div class="ticket-status-title">
                LIVE TICKET STATUS
            </div>

            <div id="refresh-timer">
                Refreshing in 30s
            </div>
        </div>

        <div class="ticket-stats">

            <div class="ticket-box pending-box">

                <div class="ticket-label">
                    Pending
                </div>

                <div class="ticket-value"
                     id="pending-count">
                </div>

            </div>

            <div class="ticket-box response-box">

                <div class="ticket-label">

                    Avg Response

                    <br>

                    <span class="ticket-sub-label">
                        day(s)
                    </span>

                </div>

                <div class="ticket-value">

                    <span id="avg-response"></span>

                    <span id="response-trend"></span>

                </div>

            </div>

        </div>

        <!-- CHECK TICKET -->

        <div class="ticket-check-wrapper">

            <button
                class="ticket-toggle-button"
                onclick="toggleTicketLookup()"
            >
                Check Ticket Status
            </button>

            <div
                id="ticket-lookup-box"
                class="ticket-lookup-box"
            >

                <div class="ticket-search-row">

                    <input
                        type="text"
                        placeholder="e.g. TKT-369525"
                        class="ticket-input"
                        id="ticket-input"
                    >

                    <button
                        class="ticket-search-button"
                        id="ticket-search-button"
                    >
                        Check Status
                    </button>

                </div>

                <div
                    class="ticket-result-box"
                    id="ticket-result-box"
                >

                    <div 
                        class="ticket-result-title"
                        id="ticket-result-title"
                    >
                    </div>

                    <div 
                        class="ticket-result-text"
                        id="ticket-result-text"
                    >
                    </div>

                </div>

            </div>

        </div>

        <!-- SUBMIT BUTTON -->

        <a
            href="https://forms.gle/ZZ4shNqVpUedoXwi9"
            target="_blank"
            class="ticket-button"
        >
            Submit Ticket
        </a>

    </div>

</div>
