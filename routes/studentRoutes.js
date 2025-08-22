import express from 'express';
import {
  getAllCourses,
  getCourseDetail,
  addCourse,
  dropCourse,
  getMyCourses,
  getStudentInfo,
  confirmAdvising,
} from '../controllers/studentController.js';

const router = express.Router();


router.get('/courses', getAllCourses);
router.get('/courses/:courseId', getCourseDetail);
router.post('/add-course', addCourse);
router.post('/drop-course', dropCourse);
router.get('/my-courses/:studentId', getMyCourses);
router.get('/info/:studentId', getStudentInfo);
router.put('/confirm-advising/:studentId', confirmAdvising);

export default router;