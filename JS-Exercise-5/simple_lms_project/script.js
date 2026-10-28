const authSection = document.getElementById("authSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMessage = document.getElementById("authMessage");
const logoutBtn = document.getElementById("logoutBtn");
const adminPanel = document.getElementById("adminPanel");
const courseForm = document.getElementById("courseForm");
const assignForm = document.getElementById("assignForm");

// Read saved information from local storage
let users = JSON.parse(localStorage.getItem("lmsUsers")) || [];
let courses = JSON.parse(localStorage.getItem("lmsCourses")) || [];
let currentUser = JSON.parse(sessionStorage.getItem("lmsCurrentUser")) || null;

if (courses.length === 0) {
    courses = [
        { id: 1, title: "HTML Basics", description: "Learn the structure of web pages." },
        { id: 2, title: "CSS Basics", description: "Learn how to style a web page." },
        { id: 3, title: "JavaScript Basics", description: "Learn the basics of programming in JavaScript." }
    ];
    saveCourses();
}

// Save users and courses
function saveUsers() {
    localStorage.setItem("lmsUsers", JSON.stringify(users));
}

function saveCourses() {
    localStorage.setItem("lmsCourses", JSON.stringify(courses));
}

// Switch between sign in and sign up forms
document.getElementById("showLoginBtn").addEventListener("click", function () {
    loginForm.classList.remove("d-none");
    signupForm.classList.add("d-none");
    document.getElementById("showLoginBtn").classList.add("active");
    document.getElementById("showSignupBtn").classList.remove("active");
    authMessage.textContent = "";
});

document.getElementById("showSignupBtn").addEventListener("click", function () {
    signupForm.classList.remove("d-none");
    loginForm.classList.add("d-none");
    document.getElementById("showSignupBtn").classList.add("active");
    document.getElementById("showLoginBtn").classList.remove("active");
    authMessage.textContent = "";
});

// Create a new account
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("signupRole").value;

    const alreadyExists = users.some(function (user) {
        return user.email === email;
    });

    if (alreadyExists) {
        authMessage.textContent = "An account with this email already exists.";
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        role: role,
        courseIds: []
    };

    users.push(newUser);
    saveUsers();
    signupForm.reset();
    authMessage.style.color = "green";
    authMessage.textContent = "Account created. You can now sign in.";
});

// Sign in
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const foundUser = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!foundUser) {
        authMessage.style.color = "#b02a37";
        authMessage.textContent = "Email or password is incorrect.";
        return;
    }

    currentUser = foundUser;
    sessionStorage.setItem("lmsCurrentUser", JSON.stringify(currentUser));
    loginForm.reset();
    showDashboard();
});

// Sign out
logoutBtn.addEventListener("click", function () {
    currentUser = null;
    sessionStorage.removeItem("lmsCurrentUser");
    dashboardSection.classList.add("d-none");
    authSection.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
    authMessage.textContent = "";
});

// Show the correct dashboard
function showDashboard() {
    if (!currentUser) return;

    authSection.classList.add("d-none");
    dashboardSection.classList.remove("d-none");
    logoutBtn.classList.remove("d-none");

    document.getElementById("welcomeText").textContent = "Hello, " + currentUser.name;
    document.getElementById("roleText").textContent = currentUser.role.toUpperCase();

    if (currentUser.role === "admin") {
        adminPanel.classList.remove("d-none");
        document.getElementById("adminUsersPanel").classList.remove("d-none");
        document.getElementById("courseHeading").textContent = "All Courses";
    } else {
        adminPanel.classList.add("d-none");
        document.getElementById("adminUsersPanel").classList.add("d-none");
        document.getElementById("courseHeading").textContent = "My Courses";
    }

    renderCourses();
    fillStudentDropdown();
    fillCourseDropdown();
    renderStudentAssignments();
}

// Show courses available to this user
function renderCourses() {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    let visibleCourses = courses;

    if (currentUser.role === "student") {
        visibleCourses = courses.filter(function (course) {
            return currentUser.courseIds.includes(course.id);
        });
    }

    if (visibleCourses.length === 0) {
        courseList.innerHTML = '<div class="col-12"><p class="text-muted">No courses assigned yet.</p></div>';
        return;
    }

    visibleCourses.forEach(function (course) {
        const column = document.createElement("div");
        column.className = "col-md-6 col-lg-4";

        let adminButtons = "";
        if (currentUser.role === "admin") {
            adminButtons = `
                <button class="btn btn-outline-danger btn-sm mt-3" onclick="removeCourse(${course.id})">
                    Remove Course
                </button>`;
        }

        column.innerHTML = `
            <div class="card course-card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${escapeHTML(course.title)}</h5>
                    <p class="card-text course-description">${escapeHTML(course.description)}</p>
                    ${adminButtons}
                </div>
            </div>`;
        courseList.appendChild(column);
    });
}

// Keep user-entered text from being treated as HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };
        return characters[character];
    });
}

// Admin adds a course
courseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("courseTitle").value.trim();
    const description = document.getElementById("courseDescription").value.trim();

    if (title === "" || description === "") return;

    courses.push({
        id: Date.now(),
        title: title,
        description: description
    });

    saveCourses();
    courseForm.reset();
    showDashboard();
});

// Admin removes a course and removes its assignments
function removeCourse(courseId) {
    if (!confirm("Remove this course?")) return;

    courses = courses.filter(function (course) {
        return course.id !== courseId;
    });

    users.forEach(function (user) {
        user.courseIds = user.courseIds.filter(function (id) {
            return id !== courseId;
        });
    });

    saveCourses();
    saveUsers();

    // Refresh current user in case its stored course list changed
    currentUser = users.find(function (user) {
        return user.id === currentUser.id;
    }) || currentUser;
    sessionStorage.setItem("lmsCurrentUser", JSON.stringify(currentUser));
    showDashboard();
}

function fillStudentDropdown() {
    const studentSelect = document.getElementById("studentSelect");
    studentSelect.innerHTML = '<option value="">Choose student</option>';

    users.filter(function (user) {
        return user.role === "student";
    }).forEach(function (student) {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = student.name + " (" + student.email + ")";
        studentSelect.appendChild(option);
    });
}

function fillCourseDropdown() {
    const courseSelect = document.getElementById("assignCourseSelect");
    courseSelect.innerHTML = '<option value="">Choose course</option>';

    courses.forEach(function (course) {
        const option = document.createElement("option");
        option.value = course.id;
        option.textContent = course.title;
        courseSelect.appendChild(option);
    });
}

assignForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentId = Number(document.getElementById("studentSelect").value);
    const courseId = Number(document.getElementById("assignCourseSelect").value);
    const student = users.find(function (user) {
        return user.id === studentId && user.role === "student";
    });

    if (!student || !courses.some(function (course) { return course.id === courseId; })) {
        return;
    }

    if (student.courseIds.includes(courseId)) {
        document.getElementById("assignMessage").textContent = "This course is already assigned to that student.";
        return;
    }

    student.courseIds.push(courseId);
    saveUsers();
    document.getElementById("assignMessage").style.color = "green";
    document.getElementById("assignMessage").textContent = "Course assigned successfully.";
    assignForm.reset();
    renderStudentAssignments();
});

function renderStudentAssignments() {
    const container = document.getElementById("studentAssignments");
    if (currentUser.role !== "admin") return;

    const students = users.filter(function (user) {
        return user.role === "student";
    });

    if (students.length === 0) {
        container.innerHTML = '<p class="text-muted">No student accounts yet.</p>';
        return;
    }

    let table = `
        <table class="table table-bordered table-striped mt-2">
            <thead><tr><th>Student</th><th>Assigned Courses</th></tr></thead>
            <tbody>`;

    students.forEach(function (student) {
        const names = courses
            .filter(function (course) { return student.courseIds.includes(course.id); })
            .map(function (course) { return course.title; });

        table += `<tr>
            <td>${escapeHTML(student.name)}<br><small>${escapeHTML(student.email)}</small></td>
            <td>${names.length ? names.map(escapeHTML).join(", ") : "No courses assigned"}</td>
        </tr>`;
    });

    table += "</tbody></table>";
    container.innerHTML = table;
}

if (currentUser) {
    // Get latest user information from local storage
    currentUser = users.find(function (user) {
        return user.id === currentUser.id;
    }) || null;

    if (currentUser) showDashboard();
}
