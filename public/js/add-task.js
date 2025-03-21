// Add task page custom dropdowns

// Employee dropdown
const dropdownBtn = document.getElementById("dropdown-btn-employee");
const dropdownMenu = document.querySelector(".dropdown-menu.employee");

const selectedImg = document.getElementById("selected-img");
const selectedText = document.getElementById("selected-text");
const selectedEmployeeInput = document.getElementById("selected-employee");

// Toggle employee dropdown visibility
dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
});

// Handle dropdown option selection
dropdownMenu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img").src;
        const text = item.querySelector("span").innerText;
        const value = item.getAttribute("data-value");

        selectedImg.src = img;
        selectedImg.style.display = "inline-block";
        selectedText.innerText = text;
        selectedEmployeeInput.value = value;
        dropdownMenu.classList.remove("show");
    });
});

// Priority dropdown
const priorityBtn = document.getElementById("dropdown-btn-priority");
const priorityMenu = document.querySelector(".dropdown-menu.priority");
const priorityIcon = document.getElementById("selected-icon");
const priorityText = document.getElementById("selected-priority-text");
const priorityInput = document.getElementById("selected-priority");

// Toggle priority dropdown
priorityBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    priorityMenu.classList.toggle("show");
});

// Handle dropdown option selection
priorityMenu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
        const icon = item.querySelector("img");
        const text = item.querySelector("span").innerText;
        const value = item.getAttribute("data-value");

        priorityIcon.src = icon ? icon.src : "";
        priorityIcon.style.display = "inline-block";
        priorityText.innerText = text;
        priorityInput.value = value;

        console.log(priorityInput.value);

        priorityMenu.classList.remove("show");
    });
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
    if (priorityBtn && priorityMenu && !priorityBtn.contains(e.target) && !priorityMenu.contains(e.target)) {
        priorityMenu.classList.remove("show");
    }

    if (dropdownBtn && dropdownMenu && !dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show");
    }
});

// Calendar restrictions
const deadlineInput = document.getElementById("deadline");
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const yyyy = tomorrow.getFullYear();
const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
const dd = String(tomorrow.getDate()).padStart(2, "0");
const formattedTomorrow = `${yyyy}-${mm}-${dd}`;

// Set default value and min attribute to tomorrow
deadlineInput.value = formattedTomorrow;
deadlineInput.min = formattedTomorrow;