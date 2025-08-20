import pool from '../db.js'

export async function getWaitingStudentsCourses() {
  const [rows] = await pool.query(
    `SELECT 
      st.student_email AS student_email,
      st.name AS student_name,
      st.status,
      c.course_id,
      c.title,
      s.section_id,
      s.schedule,
      s.faculty
    FROM manages sc
    JOIN student st ON sc.student_email = st.student_email
    JOIN course c ON sc.course_id = c.course_id
    JOIN section s ON sc.course_id = s.course_id AND sc.section_id = s.section_id
    WHERE st.status = 'waiting'
    ORDER BY st.student_email, c.course_id, s.section_id`
  );

  const grouped = rows.reduce((acc, row) => {
    if (!acc[row.student_email]) {
      acc[row.student_email] = {
        student_email: row.student_email,
        student_name: row.student_name,
        status: row.status,
        courses: []
      };
    }
    acc[row.student_email].courses.push({
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



export async function approveAdvising(studentEmail, status) {
  await pool.query(
    `UPDATE student
     SET status = ?
     WHERE student_email = ?`,
    [status, studentEmail]
  );

  if (status === 'denied') {
    const [courses] = await pool.query(
      `SELECT course_id, section_id FROM manages WHERE student_email = ?`,
      [studentEmail]
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



