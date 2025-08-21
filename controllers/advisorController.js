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
  const { studentEmail } = req.params; 
  const { status } = req.body;

  if (!['approved', 'denied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be "approved" or "denied".' });
  }

  try {
    await advisorModel.approveAdvising(studentEmail, status); 
    res.status(200).json({ message: `Advising ${status} for student ${studentEmail}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addCourse(req, res) {
  const { studentEmail, courseId, sectionId, advisorEmail } = req.body;

  if (!studentEmail || !courseId || !sectionId || !advisorEmail) {
    return res.status(400).json({
      error: "Missing required fields: studentEmail, courseId, sectionId, advisorEmail"
    });
  }

  try {
    await advisorModel.advisorAddCourse(advisorEmail, studentEmail, courseId, sectionId);
    res.status(200).json({ 
      message: `Course ${courseId} (Section ${sectionId}) added for ${studentEmail} by advisor ${advisorEmail}` 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function dropCourse(req, res) {
  const { studentEmail, courseId, sectionId} = req.body;

  if (!studentEmail || !courseId || !sectionId) {
    return res.status(400).json({
      error: "Missing required fields: studentEmail, courseId and sectionId"
    });
  }

  try {
    await advisorModel.advisorDropCourse(studentEmail, courseId, sectionId);
    res.status(200).json({ 
      message: `Course ${courseId} (Section ${sectionId}) dropped for ${studentEmail}` 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}