// Task filtration
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
        selectedContainer.innerHTML = '';

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