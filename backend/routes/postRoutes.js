import express from 'express';
import * as postController from '../controller/postController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, postController.getPosts);
router.post('/', authenticateToken, postController.addPost);
router.put('/:id', authenticateToken, postController.updatePost);
router.delete('/:id', authenticateToken, postController.deletePost);

export default router;