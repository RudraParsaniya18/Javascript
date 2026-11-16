function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "signin.html";
}