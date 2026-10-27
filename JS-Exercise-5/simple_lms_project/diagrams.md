# Simple LMS - System Design Diagrams

These diagrams use Mermaid syntax. Paste each diagram into https://mermaid.live to view or export it.

## 1. Use Case Diagram

```mermaid
flowchart LR
    Student([Student])
    Admin([Admin])
    LMS((Simple LMS))
    SignUp[Sign up]
    SignIn[Sign in]
    ViewCourses[View assigned courses]
    AddCourse[Add course]
    RemoveCourse[Remove course]
    AssignCourse[Assign course to student]
    ViewStudents[View student assignments]

    Student --- SignUp
    Student --- SignIn
    Student --- ViewCourses
    Admin --- SignUp
    Admin --- SignIn
    Admin --- AddCourse
    Admin --- RemoveCourse
    Admin --- AssignCourse
    Admin --- ViewStudents

    SignUp --- LMS
    SignIn --- LMS
    ViewCourses --- LMS
    AddCourse --- LMS
    RemoveCourse --- LMS
    AssignCourse --- LMS
    ViewStudents --- LMS
```

## 2. Class Diagram

```mermaid
classDiagram
    class User {
        +number id
        +string name
        +string email
        +string password
        +string role
        +number[] courseIds
    }
    class Course {
        +number id
        +string title
        +string description
    }
    class LMSApp {
        +signUp()
        +signIn()
        +addCourse()
        +removeCourse()
        +assignCourse()
        +renderCourses()
        +saveUsers()
        +saveCourses()
    }
    User "many" --> "many" Course : assigned through courseIds
    LMSApp ..> User : manages
    LMSApp ..> Course : manages
```

## 3. ER Diagram

```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email
        string password
        string role
    }
    COURSE {
        int id PK
        string title
        string description
    }
    USER_COURSE {
        int user_id FK
        int course_id FK
    }
    USER ||--o{ USER_COURSE : receives
    COURSE ||--o{ USER_COURSE : assigned_in
```

In this beginner project, `USER_COURSE` is represented by each user's `courseIds` array in local storage instead of a separate table.

## 4. Sequence Diagram - Student views assigned courses

```mermaid
sequenceDiagram
    actor Student
    participant Page as HTML Page
    participant JS as JavaScript
    participant Store as localStorage

    Student->>Page: Enter email and password
    Page->>JS: Submit sign-in form
    JS->>Store: Read saved users
    Store-->>JS: User records
    JS->>JS: Check email and password
    JS-->>Page: Show student dashboard
    JS->>Store: Read courses and courseIds
    Store-->>JS: Saved courses and assignments
    JS-->>Page: Display assigned courses
```

## 5. Sequence Diagram - Admin assigns a course

```mermaid
sequenceDiagram
    actor Admin
    participant Page as Admin Dashboard
    participant JS as JavaScript
    participant Store as localStorage

    Admin->>Page: Choose student and course
    Admin->>Page: Click Assign
    Page->>JS: Submit assignment form
    JS->>Store: Read user records
    Store-->>JS: User records
    JS->>JS: Check student and duplicate assignment
    JS->>JS: Add course ID to student's courseIds
    JS->>Store: Save updated users
    JS-->>Page: Show success message and refresh assignments
```

## Important notes

- This is a front-end learning demo. `localStorage` is stored in one browser and is not shared between different users or devices.
- A real LMS should use a backend, a database, secure password hashing, and server-side role permissions.
- Letting anyone choose “Admin” on sign-up is okay only for this assignment demo. A real product must restrict who can become an admin.
