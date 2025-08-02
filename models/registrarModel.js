import pool from '../db.js'

// NO DUPLICATE CHECK
export async function addCourse(courseId, title, name, examSchedule) {
  await pool.query(
    `INSERT INTO course (Course_id, title, name, Exam_Schedule) 
     VALUES (?, ?, ?, ?)`,
    [courseId, title, name, examSchedule]
  );
}
export async function deleteCourse(courseId) {
  await pool.query(
    `DELETE FROM course WHERE Course_id = ?`,
    [courseId]
  );
}

//NO DUPLICATE CHECK
export async function addSection(courseId, sectionId, schedule, seatAvailability, faculty) {
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
