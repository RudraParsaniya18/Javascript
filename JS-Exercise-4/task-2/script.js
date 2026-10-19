
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");

let editRow = null;
addBtn.addEventListener("click", function () {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (firstName === "" || lastName === "") {
        alert("Please enter both first name and last name.");
        return;
    }

    if (editRow !== null) {
        editRow.cells[0].textContent = firstName;
        editRow.cells[1].textContent = lastName;

        editRow = null;
        addBtn.textContent = "Add";
        addBtn.classList.remove("btn-success");
        addBtn.classList.add("btn-primary");
    } else {
        // Create a new table row
        const row = tableBody.insertRow();

        const firstNameCell = row.insertCell(0);
        const lastNameCell = row.insertCell(1);
        const actionCell = row.insertCell(2);

        firstNameCell.textContent = firstName;
        lastNameCell.textContent = lastName;

        // Create Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "btn btn-warning btn-sm action-btn";

        editBtn.addEventListener("click", function () {
            firstNameInput.value = row.cells[0].textContent;
            lastNameInput.value = row.cells[1].textContent;

            editRow = row;

            addBtn.textContent = "Update";
            addBtn.classList.remove("btn-primary");
            addBtn.classList.add("btn-success");
        });

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm action-btn";

        deleteBtn.addEventListener("click", function () {
            // If this is the row currently being edited, reset the form
            if (editRow === row) {
                editRow = null;
                addBtn.textContent = "Add";
                addBtn.classList.remove("btn-success");
                addBtn.classList.add("btn-primary");

                firstNameInput.value = "";
                lastNameInput.value = "";
            }

            row.remove();
        });

        // Add buttons to the Actions cell
        actionCell.append(editBtn, deleteBtn);
    }

    // Clear inputs after Add or Update
    firstNameInput.value = "";
    lastNameInput.value = "";
});
