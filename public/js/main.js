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
    const file = event.target.files[0];

    if (file) {
        if (!file.type.startsWith('image/')) {
            alert("Please upload a valid image (JPG, PNG, etc.).");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('avatarPreview').src = e.target.result;
        };

        reader.readAsDataURL(file);
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

    if (!smallTags || smallTags.length < 2) return;

    const valueLength = input.value.length;

    // Minimum length validation
    if (valueLength < minLimit) {
        smallTags[0].style.color = "red";
        smallTags[1].style.color = "";
    } else {
        smallTags[0].style.color = "green";
    }

    // Maximum length validation
    if (valueLength > maxLimit) {
        smallTags[1].style.color = "red";
    } else if (valueLength >= minLimit) {
        smallTags[1].style.color = "green";
    }
}

// Apply event listeners to all inputs
document.querySelectorAll(".form-control").forEach(input => {
    input.addEventListener("input", function () {
        validateInput(this);
    });
});
