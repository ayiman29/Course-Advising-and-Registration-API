import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import {
  getWaitingStudentsCourses,
  approveAdvising,
  addCourse,
  dropCourse,
  getStudentCourses,
} from '../controllers/advisorController.js';

const router = express.Router();


router.use(authenticateToken, authorizeRole('advisor'));

router.get('/waiting-students', getWaitingStudentsCourses);
router.put('/approve/:studentId', approveAdvising);
router.post('/add-course', addCourse);
router.post('/drop-course', dropCourse);
router.get('/student-courses/:studentId', getStudentCourses);


export default router;
