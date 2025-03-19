document.querySelector(".close-btn").addEventListener("click", function() {
    document.querySelector(".add-employee-container").classList.remove("show");
    document.querySelector(".blur").classList.remove("show");
});

document.getElementById("add-employee-btn").addEventListener("click", function() {
    document.querySelector(".add-employee-container").classList.add("show");
    document.querySelector(".blur").classList.add("show");
})

document.getElementById("dropdown-btn").addEventListener("click", function () {
    document.querySelector(".dropdown-menu").classList.toggle("show");
});

document.querySelectorAll(".dropdown-menu li").forEach(item => {
    item.addEventListener("click", function () {
        // Update button text and image
        document.getElementById("selected-img").src = this.querySelector("img").src;
        document.getElementById("selected-text").innerText = this.querySelector("span").innerText;

        document.getElementById("selected-img").style.display = "inline-block";

        // Update hidden input value
        document.getElementById("selected-value").value = this.getAttribute("data-value");

        // Hide the dropdown
        document.querySelector(".dropdown-menu").classList.remove("show");
    });
});

document.getElementById("dropdown-btn-priority").addEventListener("click", function () {
    document.querySelector(".dropdown-menu.priority").classList.toggle("show");
});

// Update selected priority when an item is clicked
document.querySelectorAll(".dropdown-menu.priority li").forEach(item => {
    item.addEventListener("click", function () {
        // Update button icon and text
        const icon = this.querySelector("ion-icon");
        const text = this.querySelector("span").innerText;
        const value = this.getAttribute("data-value");

        document.getElementById("selected-icon").name = icon ? icon.name : "";
        document.getElementById("selected-icon").style.display = "inline-block";
        document.getElementById("selected-icon").style.color = icon.style.color;
        document.getElementById("selected-priority").innerText = text;

        // Update hidden input value
        document.getElementById("selected-priority-input").value = value;

        // Hide the dropdown
        document.querySelector(".dropdown-menu.priority").classList.remove("show");
    });
});

const dropdownBtn = document.getElementById("dropdown-btn-departments");
const dropdownMenu = document.querySelector(".custom-dropdown-menu");
const selectedDept = document.getElementById("selected-department");
const hiddenInput = document.getElementById("selected-department-value");

// Toggle dropdown visibility
dropdownBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
});

// Handle option selection
dropdownMenu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", function () {
        const selectedText = this.innerText;
        const selectedValue = this.getAttribute("data-value");

        // Update displayed text and hidden input value
        selectedDept.innerText = selectedText;
        hiddenInput.value = selectedValue;

        // Close the dropdown
        dropdownMenu.classList.remove("show");
    });
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("show");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const deptBtn = document.getElementById("dropdown-btn-departments");
    const deptMenu = document.querySelector(".dropdown-menu.departments");
    const selectedDept = document.getElementById("selected-department");
    const selectedIconDept = document.getElementById("selected-icon-department");
    const hiddenDeptInput = document.getElementById("selected-department-value");

    // Toggle dropdown visibility
    deptBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent document click listener
        deptMenu.classList.toggle("show");
    });

    // Handle option selection
    deptMenu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", () => {
            const deptValue = item.getAttribute("data-value");
            const deptText = item.querySelector("span").innerText;
            const iconName = item.querySelector("ion-icon").getAttribute("name");

            selectedDept.innerText = deptText;
            selectedIconDept.setAttribute("name", iconName);
            selectedIconDept.style.display = "inline-block";
            hiddenDeptInput.value = deptValue;

            deptMenu.classList.remove("show");
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!deptBtn.contains(e.target) && !deptMenu.contains(e.target)) {
            deptMenu.classList.remove("show");
        }
    });
});

