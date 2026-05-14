import express from 'express';
import * as commentController from '../controller/commentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', commentController.getCommentsByPost);
router.post('/', authenticateToken, commentController.addComment);
router.put('/:id', authenticateToken, commentController.updateComment); 
router.delete('/:id', authenticateToken, commentController.deleteComment);
router.delete('/by-post/:postId', authenticateToken, commentController.deleteCommentsByPost);

export default router;