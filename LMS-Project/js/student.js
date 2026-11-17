// Get logged-in user
let user = JSON.parse(localStorage.getItem("loggedInUser"));

// Display user name
document.getElementById("welcomeMessage").innerText =
    "Welcome, " + user.name;

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "signin.html";
}