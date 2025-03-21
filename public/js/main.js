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


document.addEventListener('DOMContentLoaded', () => {
    const tasks = Array.from(document.querySelectorAll('.task'));
    const selectedContainer = document.getElementById('selectedContainer');

    const filterTasks = () => {
        const selectedDepartments = Array.from(document.querySelectorAll('.department-checkbox:checked')).map(cb => cb.value);
        const selectedPriorities = Array.from(document.querySelectorAll('.priority-checkbox:checked')).map(cb => cb.value);
        const selectedEmployees = Array.from(document.querySelectorAll('.employee-checkbox:checked')).map(cb => cb.value);

        tasks.forEach(task => {
            const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(task.dataset.departmentId);
            const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(task.dataset.priorityId);
            const matchesEmployee = selectedEmployees.length === 0 || selectedEmployees.includes(task.dataset.employeeId);

            task.style.display = (matchesDepartment && matchesPriority && matchesEmployee) ? 'block' : 'none';
        });
    };

    const updateSelectedItems = () => {
        selectedContainer.innerHTML = ''; // Clear previous selections

        const addSelectedItem = (type, id, name) => {
            const selectedItem = document.createElement('div');
            selectedItem.classList.add('selected-item');
            selectedItem.dataset.type = type;
            selectedItem.dataset.id = id;
            selectedItem.innerHTML = `
                    <p>${name}</p>
                    <button type="button" class="remove-item"><ion-icon name="close-outline"></ion-icon></button>
                `;
            selectedContainer.appendChild(selectedItem);
        };

        const addClearButton = () => {
            const clearItem = document.createElement('div');
            clearItem.classList.add('selected-item');
            clearItem.style.border = 'none';
            clearItem.innerHTML = `
                    <button type="button" class="empty-btn">გასუფთავება</button>
                `;
            selectedContainer.appendChild(clearItem);

            clearItem.querySelector('.empty-btn').addEventListener('click', () => {
                document.querySelectorAll('.department-checkbox, .priority-checkbox, .employee-checkbox').forEach(cb => cb.checked = false);
                updateSelectedItems();
                filterTasks();
            });
        };

        document.querySelectorAll('.department-checkbox:checked').forEach(cb => addSelectedItem('department', cb.value, cb.nextElementSibling.innerText.trim()));
        document.querySelectorAll('.priority-checkbox:checked').forEach(cb => addSelectedItem('priority', cb.value, cb.nextElementSibling.innerText.trim()));
        document.querySelectorAll('.employee-checkbox:checked').forEach(cb => addSelectedItem('employee', cb.value, cb.nextElementSibling.innerText.trim()));

        if (selectedContainer.children.length > 0) addClearButton();
    };

    const setupFilterForm = (formId) => {
        document.getElementById(formId).addEventListener('submit', (e) => {
            e.preventDefault();
            updateSelectedItems();
            filterTasks();
        });
    };

    // Setup filter forms
    setupFilterForm('departmentFilter');
    setupFilterForm('priorityFilter');
    setupFilterForm('employeeFilter');

    // Handle removing individual filters
    selectedContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-item')) {
            const item = e.target.closest('.selected-item');
            const type = item.dataset.type;
            const id = item.dataset.id;

            document.querySelector(`.${type}-checkbox[value="${id}"]`).checked = false;

            updateSelectedItems();
            filterTasks();
        }
    });
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

document.addEventListener('DOMContentLoaded', () => {
    // Event delegation for reply buttons
    document.body.addEventListener('click', (event) => {
        const replyBtn = event.target.closest('.reply-btn');

        if (replyBtn) {
            const form = replyBtn.nextElementSibling;

            // Toggle form visibility
            if (form.style.display === 'block') {
                form.style.maxHeight = null;
                form.style.opacity = 0;
                setTimeout(() => form.style.display = 'none', 300);
            } else {
                form.style.display = 'block';
                setTimeout(() => {
                    form.style.maxHeight = form.scrollHeight + 'px';
                    form.style.opacity = 1;
                }, 10);
            }
        }
    });

    // Hide form on submit
    document.querySelectorAll('.reply-form').forEach(form => {
        form.addEventListener('submit', () => {
            form.style.maxHeight = null;
            form.style.opacity = 0;
            setTimeout(() => form.style.display = 'none', 300);
        });
    });
});

