
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const selectAll = document.getElementById("selectAll");
const tableBody = document.getElementById("tableBody");
const selectedCount = document.getElementById("selectedCount");

let nextEmployeeId = 1;

// Get all row checkboxes
function getRowCheckboxes() {
    return tableBody.querySelectorAll(".rowCheckbox");
}

// Update count, delete button, and Select All checkbox
function updateSelection() {
    const checkboxes = getRowCheckboxes();

    const selectedCheckboxes = Array.from(checkboxes).filter(
        checkbox => checkbox.checked
    );

    const selected = selectedCheckboxes.length;
    const total = checkboxes.length;

    // Display selected row count
    selectedCount.textContent =
        `${selected} ${selected === 1 ? "row" : "rows"} selected`;

    // Enable Delete only when at least one row is selected
    deleteBtn.disabled = selected === 0;

    // Update Select All checkbox
    selectAll.checked = total > 0 && selected === total;

    // Show partial selection state
    selectAll.indeterminate = selected > 0 && selected < total;

    // Highlight selected rows
    checkboxes.forEach(checkbox => {
        checkbox.closest("tr").classList.toggle(
            "selected-row",
            checkbox.checked
        );
    });
}

// Select or deselect all rows
selectAll.addEventListener("change", function () {
    getRowCheckboxes().forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });

    updateSelection();
});

// Handle individual checkbox changes
tableBody.addEventListener("change", function (event) {
    if (event.target.classList.contains("rowCheckbox")) {
        updateSelection();
    }
});

// Add a new row
addBtn.addEventListener("click", function () {
    const row = document.createElement("tr");

    const id = nextEmployeeId++;

    row.innerHTML = `
        <td>
            <input
                type="checkbox"
                class="rowCheckbox"
                aria-label="Select Employee ${id}"
            >
        </td>
        <td>Employee ${id}</td>
        <td>New User</td>
        <td>employee${id}@example.com</td>
    `;

    // New checkbox is unchecked by default
    tableBody.appendChild(row);

    updateSelection();
});

// Delete only selected rows
deleteBtn.addEventListener("click", function () {
    const selectedCheckboxes = Array.from(getRowCheckboxes()).filter(
        checkbox => checkbox.checked
    );

    if (selectedCheckboxes.length === 0) {
        return;
    }

    const confirmDelete = confirm(
        `Delete ${selectedCheckboxes.length} selected row(s)?`
    );

    if (!confirmDelete) {
        return;
    }

    selectedCheckboxes.forEach(checkbox => {
        checkbox.closest("tr").remove();
    });

    updateSelection();
});

// Initialize the table state
updateSelection();
