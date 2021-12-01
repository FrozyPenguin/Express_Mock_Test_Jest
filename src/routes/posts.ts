import { Router } from 'express';
import { getPosts, getPost, addPost } from '../controllers/PostsCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/'
router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', addPost);

export default router;
