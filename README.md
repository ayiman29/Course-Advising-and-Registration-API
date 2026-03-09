# Course Advising and Registration API
:)<br>
A backend REST API built with **Express.js** and **MySQL** for managing university course advising and registration workflows.
It is part of a full-stack project, and the frontend can be found here:
**[https://github.com/tahi4/connect-advising-frontend](https://github.com/tahi4/connect-advising-frontend)**

## Directory Structure
```
app.js
db.js
controllers/
middleware/
models/
routes/
package.json
.gitignore
misc
````

## Installation
```bash
npm install
````

Set up MySQL database and configure `db.js`.

## Run

```bash
npm run dev
```

## API Endpoints

### Auth

| Method | Endpoint | Params / Body                  |
| ------ | -------- | ------------------------------ |
| POST   | /auth/signup | name, email, password, role |
| POST   | /auth/login  | email, password             |

---

### Student

> All routes require authentication with role = `student`

| Method | Endpoint                                  | Params / Body                                   |
| ------ | ----------------------------------------- | ----------------------------------------------- |
| GET    | /students/courses                         | -                                               |
| GET    | /students/courses/:courseId               | courseId                                        |
| POST   | /students/add-course                      | studentId, courseId, sectionId, advisorId       |
| POST   | /students/drop-course                     | studentId, courseId, sectionId                  |
| GET    | /students/my-courses/:studentId           | studentId                                       |
| GET    | /students/info/:studentId                 | studentId                                       |
| PUT    | /students/confirm-advising/:studentId     | studentId                                       |
| GET    | /students/id-by-email/:email              | studentEmail                                    |

---

### Advisor

> All routes require authentication with role = `advisor`

| Method | Endpoint                         | Params / Body                                                                           |
| ------ | -------------------------------- | ----------------------------------------------------------------------------------------|
| GET    | /advisors/waiting-students       | -                                                                                       |
| PUT    | /advisors/approve/:studentId     | studentId, status (`approved` / `denied`)                                               |
| POST   | /advisors/add-course             | advisorId, studentId, courseId, sectionId                                               |
| POST   | /advisors/drop-course            | studentId, courseId, sectionId                                                          |
| GET    | /advisors/student-courses/:studentId | studentId     [For fetching selected courses by students]                           |
| GET    | /advisors/courses/:studentId    | studentId          [For fetching all courses other than the selected ones by a student]  | 
| GET    | /advisors/course-detail/:courseId | courseId                                                                               | 
| GET    | /advisors/id-by-email/:email       | studentEmail                                                                          |

---

### Registrar

> All routes require authentication with role = `registrar`

| Method | Endpoint                                  | Params / Body                                                    |
| ------ | ----------------------------------------- | ---------------------------------------------------------------- |
| POST   | /registrars/course                         | courseId, title, name, examSchedule, courseCredit, registrarEmail, registrarId |
| DELETE | /registrars/course/:courseId               | courseId                                                         |
| POST   | /registrars/section                        | courseId, sectionId, schedule, faculty, seatAvailability         |
| DELETE | /registrars/section/:courseId/:sectionId   | courseId, sectionId                                              |



## ER and Schema

### ER Diagram
<img width="993" height="673" alt="image" src="https://github.com/user-attachments/assets/34b7eec4-6f4a-4199-a7e1-81366552e53b" />

---

### Schema Diagram
<img width="864" height="705" alt="image" src="https://github.com/user-attachments/assets/4f7c64eb-298d-4881-97c8-c538e0479726" />

## Notes

* All course addition endpoints handle: credit limit, schedule clash, seat availability, and section swaps.
* Transactions ensure data consistency for add/drop operations.
* Endpoints are grouped by role: `/students`, `/advisors`, `/registrars`, `/auth`.

