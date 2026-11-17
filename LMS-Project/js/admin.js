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

// Get course form
let courseForm = document.getElementById("courseForm");

courseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get course details
    let name = document.getElementById("courseName").value;
    let description = document.getElementById("courseDescription").value;

    // Get existing courses
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    // Create new course
    let newCourse = {
        id: Date.now(),
        name: name,
        description: description
    };

    // Add course to array
    courses.push(newCourse);

    // Save courses// Save courses
    localStorage.setItem("courses", JSON.stringify(courses));

    // Refresh course list
    displayCourses();

    alert("Course added successfully!");
    // Reset form
    courseForm.reset();

});

// Display all courses
function displayCourses() {

    // Get courses from Local Storage
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    // Get course list container
    let courseList = document.getElementById("courseList");

    // Clear previous content
    courseList.innerHTML = "";

    // Loop through courses
    courses.forEach(function (course) {

        courseList.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${course.name}</h5>
                        <p class="card-text">${course.description}</p>
                    </div>
                </div>
            </div>
        `;

    });

}

// Display courses when page loads
displayCourses();