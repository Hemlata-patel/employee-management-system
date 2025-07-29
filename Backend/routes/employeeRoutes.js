import express from 'express';
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  addSalaryEntry
} from '../controllers/employeeController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllEmployees);
router.get('/:id', verifyToken, getEmployeeById);
router.post('/', verifyToken, createEmployee);
router.put('/:id', verifyToken, updateEmployee);
router.delete('/:id', verifyToken, deleteEmployee);
router.post('/:id/salary', verifyToken, addSalaryEntry);

export default router;


