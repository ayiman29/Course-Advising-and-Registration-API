import express from 'express';
import {
  getWaitingStudentsCourses,
  approveAdvising,
} from '../controllers/advisorController.js';

const router = express.Router();


router.get('/waiting-students', getWaitingStudentsCourses);

router.put('/approve/:studentId', approveAdvising);

export default router;
