
// ================= SIGNUP =================

let signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e) {

        e.preventDefault();

        // Get form values
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let role = document.getElementById("role").value;

        // Get existing users
        let users = getUsers();

        // Check if email already exists
        let existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert("Email already registered!");
            return;
        }

        // Create new user
        let newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            role: role
        };

        // Add user to array
        users.push(newUser);

        // Save users
        saveUsers(users);

        alert("Registration successful!");

        // Redirect to signin page
        window.location.href = "signin.html";

    });

}


// ================= SIGNIN =================

let signinForm = document.getElementById("signinForm");

if (signinForm) {

    signinForm.addEventListener("submit", function(e) {

        e.preventDefault();

        // Get form values
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Get existing users
        let users = getUsers();

        // Check email and password
        let loggedInUser = users.find(user =>
            user.email === email && user.password === password
        );

        if (!loggedInUser) {
            alert("Invalid email or password!");
            return;
        }

        // Save logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        alert("Login successful!");

        // Redirect based on role
        if (loggedInUser.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            window.location.href = "student-dashboard.html";
        }

    });

}
