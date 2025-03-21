// Close "Add Employee" modal
document.querySelector(".close-btn").addEventListener("click", () => {
    document.querySelector(".add-employee-container").classList.remove("show");
    document.querySelector(".blur").classList.remove("show");
});

// Open "Add Employee" modal
document.getElementById("add-employee-btn").addEventListener("click", () => {
    document.querySelector(".add-employee-container").classList.add("show");
    document.querySelector(".blur").classList.add("show");
});

// Dropdown for general selection
const dropdownBtn = document.getElementById("dropdown-btn-employee");
const dropdownMenu = document.querySelector(".dropdown-menu.employee");

const selectedImg = document.getElementById("selected-img");
const selectedText = document.getElementById("selected-text");
const selectedEmployeeInput = document.getElementById("selected-employee");

// Toggle dropdown visibility
if(dropdownMenu) {
    dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
    });
}

if (dropdownMenu) {
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
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (dropdownBtn && dropdownMenu && !dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show");
    }
});

// Priority dropdown functionality
const priorityBtn = document.getElementById("dropdown-btn-priority");
const priorityMenu = document.querySelector(".dropdown-menu.priority");
const priorityIcon = document.getElementById("selected-icon");
const priorityText = document.getElementById("selected-priority-text");
const priorityInput = document.getElementById("selected-priority");

// Toggle priority dropdown
if (priorityBtn) {
    priorityBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        priorityMenu.classList.toggle("show");
    });
}

// Handle priority selection
if(priorityMenu) {
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
}

// Close priority dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (priorityBtn && priorityMenu && !priorityBtn.contains(e.target) && !priorityMenu.contains(e.target)) {
        priorityMenu.classList.remove("show");
    }
});

document.getElementById('avatar').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        if (!file.type.startsWith('image/')) { // Check if the file is an image
            alert("Please upload a valid image (JPG, PNG, etc.).");
            return;
        }

        const reader = new FileReader(); // Create a FileReader to read the file

        reader.onload = function (e) {
            document.getElementById('avatarPreview').src = e.target.result; // Update the preview with the selected image
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    }
});

function validateInput(input) {
    const minLimit = 2;
    const maxLimit = 255;

    // Select the small elements that are siblings of the input
    const smallTags = input.parentElement.querySelectorAll("small");

    if (!smallTags || smallTags.length < 2) return; // Ensure both small elements exist

    const valueLength = input.value.length;

    // Minimum length validation
    if (valueLength < minLimit) {
        smallTags[0].style.color = "red"; // First small tag turns red
        smallTags[1].style.color = ""; // Reset second small tag
    } else {
        smallTags[0].style.color = "green"; // First small tag turns green
    }

    // Maximum length validation
    if (valueLength > maxLimit) {
        smallTags[1].style.color = "red"; // Second small tag turns red
    } else if (valueLength >= minLimit) {
        smallTags[1].style.color = "green"; // Second small tag turns green
    }
}

// Apply event listeners to all inputs
document.querySelectorAll(".form-control").forEach(input => {
    input.addEventListener("input", function () {
        validateInput(this);
    });
});

document.getElementById("clear-btn").addEventListener("click", function () {
    const form = document.getElementById("employee-form");

    // Reset all input fields
    form.reset();

    // Reset avatar preview if there's an image preview
    document.getElementById("avatarPreview").src = "images/default.jpg";

    // Remove error/success styling from small elements
    const smallTags = document.querySelectorAll("small");
    smallTags.forEach(small => {
        small.style.color = ""; // Reset text color
    });

    document.querySelector(".add-employee-container").classList.remove("show");
    document.querySelector(".blur").classList.remove("show");
});



