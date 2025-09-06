# Course Advising and Registration API
:)
## Directory Structure
```
app.js
db.js
controllers/
models/
routes/
package.json
.gitignore

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

---

### Registrar

> All routes require authentication with role = `registrar`

| Method | Endpoint                                  | Params / Body                                                    |
| ------ | ----------------------------------------- | ---------------------------------------------------------------- |
| POST   | /registrar/course                         | courseId, title, name, examSchedule, courseCredit, registrarEmail, registrarId |
| DELETE | /registrar/course/:courseId               | courseId                                                         |
| POST   | /registrar/section                        | courseId, sectionId, schedule, faculty, seatAvailability         |
| DELETE | /registrar/section/:courseId/:sectionId   | courseId, sectionId                                              |


## Notes

* All course addition endpoints handle: credit limit, schedule clash, seat availability, and section swaps.
* Transactions ensure data consistency for add/drop operations.
* Endpoints are grouped by role: `/students`, `/advisors`, `/registrars`, `/auth`.

