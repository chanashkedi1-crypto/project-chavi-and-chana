import express from 'express';
import * as todoController from '../controller/todoController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, todoController.getTodosByUser);
router.post('/', authenticateToken, todoController.addTodo);
router.put('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

export default router;