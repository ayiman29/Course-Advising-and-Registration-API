import * as studentModel from '../models/studentModel.js';


export async function getAllCourses(req, res) {
  try {
    const courses = await studentModel.fetchCoursesWithSections(); 
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}


export async function getCourseDetail(req, res) {
  const courseId = parseInt(req.params.courseId);
  
  if (isNaN(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  try {
    const course = await studentModel.fetchCoursesWithSections(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course detail:", err);
    res.status(500).json({ error: "Failed to fetch course details" });
  }
}


export async function addCourse(req, res) {
  const { studentId, courseId, sectionId } = req.body;

  if (!studentId || !courseId || !sectionId) {
    return res.status(400).json({ error: "Missing required fields: studentId, courseId, sectionId" });
  }

  try {
    await studentModel.addCourse(studentId, courseId, sectionId);
    res.status(200).json({ message: "Course added successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export async function dropCourse(req, res) {
  const { studentId, courseId, sectionId } = req.body;

  if (!studentId || !courseId || !sectionId) {
    return res.status(400).json({ error: "Missing required fields: studentId, courseId, sectionId" });
  }

  try {
    await studentModel.dropCourse(studentId, courseId, sectionId);
    res.status(200).json({ message: "Course dropped successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export async function getMyCourses(req, res) {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ error: "Missing studentId in request parameters" });
  }

  try {
    const courses = await studentModel.getMyCourses(studentId);
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function getStudentInfo(req, res) {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ error: 'Missing studentId in request parameters' });
  }

  try {
    const student = await studentModel.getStudentInfo(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function confirmAdvising(req, res) {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ error: 'Missing studentId in request parameters' });
  }

  try {
    await studentModel.confirmAdvising(studentId);
    res.status(200).json({ message: 'Advising status updated to WAITING.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}