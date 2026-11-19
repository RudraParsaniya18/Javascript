
let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user || user.role !== "student") {
    window.location.href = "signin.html";
} else {
    document.getElementById("welcomeMessage").innerText =
        "Welcome, " + user.name;
}

document.getElementById("welcomeMessage").innerText =
    "Welcome, " + user.name;


// Display assigned courses
function displayMyCourses() {

    // Get all courses
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    // Get all assignments
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    // Find courses assigned to logged-in student
    let myAssignments = assignments.filter(function(assignment) {
        return assignment.studentId === user.id;
    });

    // Get course container
    let myCourses = document.getElementById("myCourses");

    myCourses.innerHTML = "";

    // Display assigned courses
    myAssignments.forEach(function(assignment) {

        let course = courses.find(function(course) {
            return course.id === assignment.courseId;
        });

        if (course) {
            myCourses.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-titlxe">${course.name}</h5>
                            <p class="card-text">${course.description}</p>
                        </div>
                    </div>
                </div>
            `;
        }

    });

    if (myAssignments.length === 0) {
        myCourses.innerHTML = "<p>No courses assigned yet.</p>";
    }

}

// Load courses when page opens
displayMyCourses();


// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "signin.html";
}
