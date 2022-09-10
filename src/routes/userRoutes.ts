import { Router } from 'express';
import { createUser, getAllUsers, loginUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/signup', createUser);
router.post('/signin', loginUser);

export default router;