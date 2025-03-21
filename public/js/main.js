// Header
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

// Employee avatar preview
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

// Clear button functionality
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


// Validate input based on length
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
