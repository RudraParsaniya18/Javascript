
// Get logged-in user
let user = JSON.parse(localStorage.getItem("loggedInUser"));

// Check admin access
if (!user || user.role !== "admin") {
    window.location.href = "signin.html";
} else {
    document.getElementById("welcomeMessage").innerText =
        "Welcome, " + user.name;
}

// Check user and display name
if (user) {
    document.getElementById("welcomeMessage").innerText =
        "Welcome, " + user.name;
} else {
    window.location.href = "signin.html";
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "signin.html";
}


// ================= ADD COURSE =================

// Get course form
let courseForm = document.getElementById("courseForm");

if (courseForm) {

    courseForm.addEventListener("submit", function(e) {

        e.preventDefault();

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

        // Add course
        courses.push(newCourse);

        // Save courses
        localStorage.setItem("courses", JSON.stringify(courses));

        // Refresh course list
        displayCourses();

        alert("Course added successfully!");

        courseForm.reset();

        // Refresh course dropdown
        loadCourses();

    });

}


// ================= DISPLAY COURSES =================

function displayCourses() {

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    let courseList = document.getElementById("courseList");

    if (!courseList) return;

    courseList.innerHTML = "";

    courses.forEach(function(course) {

        courseList.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${course.name}</h5>
                        <p class="card-text">${course.description}</p>

                        <button class="btn btn-danger btn-sm"
                            onclick="deleteCourse(${course.id})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;

    });

}

displayCourses();


// ================= DELETE COURSE =================

function deleteCourse(id) {

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    courses = courses.filter(function(course) {
        return course.id !== id;
    });

    localStorage.setItem("courses", JSON.stringify(courses));

    displayCourses();

    // Refresh course dropdown
    loadCourses();

    alert("Course removed successfully!");

}


// ================= LOAD STUDENTS =================

function loadStudents() {

    let users = getUsers();

    let students = users.filter(function(user) {
        return user.role === "student";
    });

    let studentSelect = document.getElementById("studentSelect");

    if (!studentSelect) return;

    studentSelect.innerHTML = '<option value="">Select Student</option>';

    students.forEach(function(student) {

        studentSelect.innerHTML += `
            <option value="${student.id}">
                ${student.name}
            </option>
        `;

    });

}


// ================= LOAD COURSES =================

function loadCourses() {

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    let courseSelect = document.getElementById("courseSelect");

    if (!courseSelect) return;

    courseSelect.innerHTML = '<option value="">Select Course</option>';

    courses.forEach(function(course) {

        courseSelect.innerHTML += `
            <option value="${course.id}">
                ${course.name}
            </option>
        `;

    });

}


// ================= ASSIGN COURSE =================

let assignForm = document.getElementById("assignForm");

if (assignForm) {

    assignForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let studentId = Number(document.getElementById("studentSelect").value);
        let courseId = Number(document.getElementById("courseSelect").value);

        let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

        let existingAssignment = assignments.find(function(assignment) {
            return assignment.studentId === studentId &&
                   assignment.courseId === courseId;
        });

        if (existingAssignment) {
            alert("Course already assigned to this student!");
            return;
        }

        let newAssignment = {
            studentId: studentId,
            courseId: courseId
        };

        assignments.push(newAssignment);

        localStorage.setItem("assignments", JSON.stringify(assignments));

        alert("Course assigned successfully!");

        assignForm.reset();

    });

}


// ================= INITIAL LOAD =================

loadStudents();
loadCourses();
