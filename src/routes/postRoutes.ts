import { Router } from 'express';
import { addPost, editPost, deletePost, getAllPosts, getOnePost } from '../controllers/postController';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);

export default router;