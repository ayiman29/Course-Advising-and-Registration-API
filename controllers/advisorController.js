import * as advisorModel from '../models/advisorModel.js';

export async function getWaitingStudentsCourses(req, res) {
  try {
    const students = await advisorModel.getWaitingStudentsCourses();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function approveAdvising(req, res) {
  const { studentId } = req.params; 
  const { status } = req.body;

  if (!['approved', 'denied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be "approved" or "denied".' });
  }

  try {
    await advisorModel.approveAdvising(studentId, status); 
    res.status(200).json({ message: `Advising ${status} for student ${studentId}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addCourse(req, res) {
  const { studentId, courseId, sectionId, advisorId } = req.body;

  if (!studentId || !courseId || !sectionId || !advisorId) {
    return res.status(400).json({
      error: "Missing required fields: studentId, courseId, sectionId, advisorId"
    });
  }

  try {
    await advisorModel.advisorAddCourse(advisorId, studentId, courseId, sectionId);
    res.status(200).json({ 
      message: `Course ${courseId} (Section ${sectionId}) added for student ${studentId} by advisor ${advisorId}` 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function dropCourse(req, res) {
  const { studentId, courseId, sectionId, advisorId } = req.body;

  if (!studentId || !courseId || !sectionId || !advisorId) {
    return res.status(400).json({
      error: "Missing required fields: studentId, courseId, sectionId, advisorId"
    });
  }

  try {
    await advisorModel.advisorDropCourse(advisorId, studentId, courseId, sectionId);
    res.status(200).json({ 
      message: `Course ${courseId} (Section ${sectionId}) dropped for student ${studentId} by advisor ${advisorId}` 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export async function getStudentCourses(req, res) {
  const studentId = parseInt(req.params.studentId);

  if (isNaN(studentId)) {
    return res.status(400).json({ error: "Missing or invalid studentId in request parameters" });
  }

  try {
    const courses = await advisorModel.getStudentCourses(studentId);
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function fetchUnselectedCourses(req, res) {
  const studentId = parseInt(req.params.studentId);

  if (isNaN(studentId)) {
    return res.status(400).json({ error: "Invalid student ID" });
  }

  try {
    const courses = await advisorModel.fetchUnselectedCourses(studentId);
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching unselected courses:", err);
    res.status(500).json({ error: "Failed to fetch unselected courses" });
  }
}


export async function getCourseDetail(req, res) {
  const courseId = parseInt(req.params.courseId);

  if (isNaN(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  try {
    const course = await advisorModel.getCourseDetail(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course detail:", err);
    res.status(500).json({ error: "Failed to fetch course detail" });
  }
}