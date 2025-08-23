import pool from '../db.js'
import { addCourse as studentAddCourse, dropCourse as studentDropCourse } from './studentModel.js';
import { createUser } from './userModel.js';


export async function createAdvisor(advisorId, email, name, password) {
  await createUser(email, name, password);

  await pool.query(
    `INSERT INTO advisor (advisor_id, email) VALUES (?, ?)`,
    [advisorId, email]
  );
  return { advisorId, email };
}


export async function getWaitingStudentsCourses() {
  const [rows] = await pool.query(
    `SELECT 
      st.student_id,
      u.name AS student_name,
      st.status,
      c.course_id,
      c.title,
      s.section_id,
      s.schedule,
      s.faculty
    FROM manages sc
    JOIN student st ON sc.student_id = st.student_id
    JOIN user u ON st.email = u.email
    JOIN course c ON sc.course_id = c.course_id
    JOIN section s ON sc.course_id = s.course_id AND sc.section_id = s.section_id
    WHERE st.status = 'waiting'
    ORDER BY st.student_id, c.course_id, s.section_id`
  );

  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.student_id]) {
      acc[row.student_id] = {
        student_id: row.student_id,
        student_name: row.student_name,
        status: row.status,
        courses: []
      };
    }
    acc[row.student_id].courses.push({
      course_id: row.course_id,
      title: row.title,
      section_id: row.section_id,
      schedule: row.schedule,
      faculty: row.faculty
    });
    return acc;
  }, {});

  return Object.values(grouped);
}



export async function approveAdvising(studentId, status) {
  await pool.query(
    `UPDATE student
     SET status = ?
     WHERE student_id = ?`,
    [status, studentId]
  );

  if (status === 'denied') {
    const [courses] = await pool.query(
      `SELECT course_id, section_id FROM manages WHERE student_id = ?`,
      [studentId]
    );

    for (const { course_id, section_id } of courses) {
      await pool.query(
        `UPDATE section
         SET seat_availability = seat_availability + 1
         WHERE course_id = ? AND section_id = ?`,
        [course_id, section_id]
      );
    }
  }
}


export async function advisorAddCourse(advisorId, studentId, courseId, sectionId) {
  return await studentAddCourse(studentId, courseId, sectionId, advisorId);
}


export async function advisorDropCourse(advisorId, studentId, courseId, sectionId) {
  return await studentDropCourse(studentId, courseId, sectionId, advisorId);
}

