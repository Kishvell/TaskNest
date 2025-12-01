document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.querySelector("#calendar");

    // Mock tasks (in real use, fetch from localStorage or database)
    const tasks = [
        {
            id: 1,
            title: "Math Assignment",
            dueDate: "2025-02-10",
            description: "Submit Chapter 4 exercises."
        },
        {
            id: 2,
            title: "Group Project",
            dueDate: "2025-02-15",
            description: "Prepare slides for TaskNest presentation."
        },
        {
            id: 3,
            title: "Database Quiz",
            dueDate: "2025-02-18",
            description: "Study SQL and indexing."
        }
    ];

    // Build month calendar (simple Feb 2025 sample)
    const daysInMonth = 28;
    for (let day = 1; day <= daysInMonth; day++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("calendar-day");
        dayBox.innerHTML = `<strong>${day}</strong>`;

        // Check for tasks on this date
        tasks.forEach(task => {
            const taskDay = parseInt(task.dueDate.split("-")[2]);
            if (taskDay === day) {
                const eventBadge = document.createElement("div");
                eventBadge.classList.add("event");
                eventBadge.textContent = task.title;
                eventBadge.dataset.id = task.id;

                // Click-to-view event
                eventBadge.addEventListener("click", () => openPanel(task));

                dayBox.appendChild(eventBadge);
            }
        });

        calendar.appendChild(dayBox);
    }

    // ===============================
    // PANEL FUNCTIONS (US2.2)
    // ===============================

    const panel = document.querySelector("#event-panel");
    const titleEl = document.querySelector("#event-title");
    const dateEl = document.querySelector("#event-date");
    const descEl = document.querySelector("#event-desc");
    const closeBtn = document.querySelector("#close-panel");
    const editBtn = document.querySelector("#edit-task");

    function openPanel(task) {
        titleEl.textContent = task.title;
        dateEl.textContent = `Due: ${task.dueDate}`;
        descEl.textContent = task.description;

        panel.classList.add("show");
    }

    closeBtn.addEventListener("click", () => {
        panel.classList.remove("show");
    });

    editBtn.addEventListener("click", () => {
        alert("Edit task screen coming soon...");
    });
});
