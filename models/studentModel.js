import pool from '../db.js'

export async function fetchCoursesWithSections(courseId = null) {
  const query = `
    SELECT 
      c.course_id,
      c.title,
      c.name AS course_name,
      c.exam_schedule,
      c.course_credit,
      s.section_id,
      s.schedule,
      s.seat_availability,
      s.faculty
    FROM course c
    JOIN section s ON c.course_id = s.course_id
    ${courseId ? 'WHERE c.course_id = ?' : ''}
    ORDER BY c.course_id, s.section_id
  `;

  const [rows] = await pool.query(query, courseId ? [courseId] : []);


  const courseMap = new Map();

  for (const row of rows) {
    if (!courseMap.has(row.course_id)) {
      courseMap.set(row.course_id, {
        course_id: row.course_id,
        title: row.title,
        course_name: row.course_name,
        exam_schedule: row.exam_schedule,
        course_credit: row.course_credit,
        sections: []
      });
    }

    courseMap.get(row.course_id).sections.push({
      section_id: row.section_id,
      schedule: row.schedule,
      seat_availability: row.seat_availability,
      faculty: row.faculty
    });
  }

  return courseId ? courseMap.get(courseId) : Array.from(courseMap.values());
}



export async function getAllCourses() {
  return await fetchCoursesWithSections();
}


export async function getCourseDetail(courseId) {
  return await fetchCoursesWithSections(courseId);
}



export async function addCourse(studentEmail, courseId, sectionId, advisorEmail) {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [[courseRow]] = await conn.query(
      `SELECT course_credit FROM course WHERE course_id = ?`,
      [courseId]
    );
    if (!courseRow) throw new Error('Course not found');
    const newCourseCredit = courseRow.course_credit;

    const [rows] = await conn.query(
      `SELECT COALESCE(SUM(c.course_credit), 0) AS total_credit
       FROM manages m
       JOIN course c ON m.course_id = c.course_id
       WHERE m.student_email = ?`,
      [studentEmail]
    );
    const totalCredit = Number(rows[0]?.total_credit) || 0;

    if (totalCredit + newCourseCredit > 15) {
      throw new Error('Credit limit exceeded (max 15 credits)');
    }

    const [[section]] = await conn.query(
      `SELECT schedule FROM section WHERE course_id = ? AND section_id = ?`,
      [courseId, sectionId]
    );
    if (!section) throw new Error('Section not found');
    const newSchedule = section.schedule;

    const [[existingEntry]] = await conn.query(
      `SELECT section_id 
       FROM manages 
       WHERE student_email = ? AND course_id = ?`,
      [studentEmail, courseId]
    );

    if (existingEntry) {
      if (existingEntry.section_id === sectionId) {
        throw new Error('Course already added with the same section.');
      }

      const [otherCourses] = await conn.query(
        `SELECT s.schedule
         FROM manages m
         JOIN section s ON m.course_id = s.course_id AND m.section_id = s.section_id
         WHERE m.student_email = ? 
           AND NOT (m.course_id = ? AND m.section_id = ?)`,
        [studentEmail, courseId, existingEntry.section_id]
      );

      const hasClash = otherCourses.some(row => row.schedule === newSchedule);
      if (hasClash) {
        throw new Error('Schedule clash detected. Section not changed.');
      }

      await conn.query(
        `DELETE FROM manages WHERE student_email = ? AND course_id = ?`,
        [studentEmail, courseId]
      );

      await conn.query(
        `UPDATE section
         SET seat_availability = seat_availability + 1
         WHERE course_id = ? AND section_id = ?`,
        [courseId, existingEntry.section_id]
      );
    } else {
      const [existing] = await conn.query(
        `SELECT s.schedule
         FROM manages m
         JOIN section s ON m.course_id = s.course_id AND m.section_id = s.section_id
         WHERE m.student_email = ?`,
        [studentEmail]
      );

      const hasClash = existing.some(row => row.schedule === newSchedule);
      if (hasClash) {
        throw new Error('Schedule clash detected. Course not added.');
      }
    }

    await conn.query(
      `INSERT INTO manages (course_id, section_id, student_email, advisor_email)
       VALUES (?, ?, ?, ?)`,
      [courseId, sectionId, studentEmail, advisorEmail]
    );

    await conn.query(
      `UPDATE section
       SET seat_availability = seat_availability - 1
       WHERE course_id = ? AND section_id = ?`,
      [courseId, sectionId]
    );

    await conn.query(
      `UPDATE student
       SET credit = credit + ?
       WHERE student_email = ?`,
      [newCourseCredit, studentEmail]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}



export async function dropCourse(studentEmail, courseId, sectionId) {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [[course]] = await conn.query(
      `SELECT course_credit FROM course WHERE course_id = ?`,
      [courseId]
    );
    const courseCredit = parseInt(course?.course_credit || 0);

    const [[advisorRow]] = await conn.query(
      `SELECT advisor_email 
       FROM manages 
       WHERE student_email = ? AND course_id = ? AND section_id = ?`,
      [studentEmail, courseId, sectionId]
    );

    if (!advisorRow) {
      throw new Error("No matching course found to drop.");
    }

    const advisorEmail = advisorRow.advisor_email;

    await conn.query(
      `DELETE FROM manages
       WHERE student_email = ? AND course_id = ? AND section_id = ? AND advisor_email = ?`,
      [studentEmail, courseId, sectionId, advisorEmail]
    );

    await conn.query(
      `UPDATE section
       SET seat_availability = seat_availability + 1
       WHERE course_id = ? AND section_id = ?`,
      [courseId, sectionId]
    );

    await conn.query(
      `UPDATE student
       SET credit = credit - ?
       WHERE student_email = ?`,
      [courseCredit, studentEmail]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}



export async function getMyCourses(studentEmail) {
  const [courses] = await pool.query(
    `SELECT 
        c.course_id,
        c.title,
        c.name,
        s.section_id,
        s.schedule,
        s.faculty
     FROM manages m
     JOIN course c ON m.course_id = c.course_id
     JOIN section s ON m.course_id = s.course_id AND m.section_id = s.section_id
     WHERE m.student_email = ?`,
    [studentEmail]
  );
  return courses;
}


export async function getStudentInfo(studentEmail) {
    const [info] = await pool.query(
        "SELECT * FROM student WHERE student_email = ?",
        [studentEmail]
    );
    return info[0];
}

export async function confirmAdvising(studentEmail) {
  const conn = await pool.getConnection();

  try {
    const [[row]] = await conn.query(
      `SELECT COALESCE(SUM(c.course_credit), 0) AS total_credit
       FROM manages m
       JOIN course c ON m.course_id = c.course_id
       WHERE m.student_email = ?`,
      [studentEmail]
    );

    const totalCredit = parseInt(row?.total_credit || 0);

    if (totalCredit < 3) {
      throw new Error("Advising cannot be confirmed. Minimum 3 credits required.");
    }

    await conn.query(
      `UPDATE student
       SET status = 'WAITING'
       WHERE student_email = ?`,
      [studentEmail]
    );
  } finally {
    conn.release();
  }
}



// issue: when max_credit, can't swap course
// issue: advisor email used but not needed