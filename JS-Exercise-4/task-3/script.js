
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addBtn = document.getElementById("addBtn");
const renderBtn = document.getElementById("renderBtn");
const tableBody = document.getElementById("tableBody");

let editRow = null;

// Static array of 12 objects
const people = [
    { firstName: "Rahul", lastName: "Sharma" },
    { firstName: "Priya", lastName: "Patel" },
    { firstName: "Amit", lastName: "Shah" },
    { firstName: "Neha", lastName: "Verma" },
    { firstName: "Rohan", lastName: "Mehta" },
    { firstName: "Anjali", lastName: "Desai" },
    { firstName: "Karan", lastName: "Joshi" },
    { firstName: "Pooja", lastName: "Trivedi" },
    { firstName: "Vishal", lastName: "Rao" },
    { firstName: "Sneha", lastName: "Kapoor" },
    { firstName: "Arjun", lastName: "Patel" },
    { firstName: "Meera", lastName: "Shah" }
];

// Render static data into the table
renderBtn.addEventListener("click", function () {
    tableBody.innerHTML = "";
    editRow = null;

    addBtn.textContent = "Add";
    addBtn.classList.remove("btn-success");
    addBtn.classList.add("btn-primary");

    firstNameInput.value = "";
    lastNameInput.value = "";

    people.forEach(function (person) {
        createRow(person.firstName, person.lastName);
    });
});

// Function to create a table row
function createRow(firstName, lastName) {
    const row = tableBody.insertRow();

    row.insertCell(0).textContent = firstName;
    row.insertCell(1).textContent = lastName;

    const actionCell = row.insertCell(2);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "action-buttons";

    // Create Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-warning btn-sm";

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
    deleteBtn.className = "btn btn-danger btn-sm";

    deleteBtn.addEventListener("click", function () {
        if (editRow === row) {
            editRow = null;

            firstNameInput.value = "";
            lastNameInput.value = "";

            addBtn.textContent = "Add";
            addBtn.classList.remove("btn-success");
            addBtn.classList.add("btn-primary");
        }

        row.remove();
    });

    // Put both buttons inside the same div
    buttonContainer.append(editBtn, deleteBtn);
    actionCell.append(buttonContainer);
}

// Add or update a row
addBtn.addEventListener("click", function () {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (firstName === "" || lastName === "") {
        alert("Please enter both first name and last name.");
        return;
    }

    // Prevent duplicate people in the table
    const duplicate = Array.from(tableBody.rows).some(function (row) {
        if (row === editRow) {
            return false;
        }

        return (
            row.cells[0].textContent.toLowerCase() === firstName.toLowerCase() &&
            row.cells[1].textContent.toLowerCase() === lastName.toLowerCase()
        );
    });

    if (duplicate) {
        alert("This person already exists in the table.");
        return;
    }

    if (editRow !== null) {
        // Update the existing row at its original position
        editRow.cells[0].textContent = firstName;
        editRow.cells[1].textContent = lastName;

        editRow = null;

        addBtn.textContent = "Add";
        addBtn.classList.remove("btn-success");
        addBtn.classList.add("btn-primary");
    } else {
        // Add a new row at the bottom
        createRow(firstName, lastName);
    }

    firstNameInput.value = "";
    lastNameInput.value = "";
});
