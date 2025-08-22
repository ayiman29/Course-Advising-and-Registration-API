import express from 'express';
import {
  getWaitingStudentsCourses,
  approveAdvising,
  addCourse,
  dropCourse,
} from '../controllers/advisorController.js';

const router = express.Router();

router.get('/waiting-students', getWaitingStudentsCourses);
router.put('/approve/:studentId', approveAdvising);
router.post('/add-course', addCourse);
router.post('/drop-course', dropCourse);

export default router;

