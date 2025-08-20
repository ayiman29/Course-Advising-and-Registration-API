import pool from '../db.js';

export async function addCourse(courseId, title, name, examSchedule, courseCredit, registrarEmail) {
  await pool.query(
    `INSERT INTO course (course_id, title, name, exam_schedule, course_credit, registrar_email) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [courseId, title, name, examSchedule, courseCredit, registrarEmail]
  );
}

export async function deleteCourse(courseId) {
  await pool.query(
    `DELETE FROM course WHERE course_id = ?`,
    [courseId]
  );
}

export async function addSection(courseId, sectionId, schedule, seatAvailability = 40, faculty) {
  await pool.query(
    `INSERT INTO section (course_id, section_id, schedule, seat_availability, faculty)
     VALUES (?, ?, ?, ?, ?)`,
    [courseId, sectionId, schedule, seatAvailability, faculty]
  );
}

export async function deleteSection(courseId, sectionId) {
  await pool.query(
    `DELETE FROM section 
     WHERE course_id = ? AND section_id = ?`,
    [courseId, sectionId]
  );
}
