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



