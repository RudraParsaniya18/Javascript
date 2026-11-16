
// Get users from Local Storage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users in Local Storage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
