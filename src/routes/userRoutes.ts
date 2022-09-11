import { Router } from 'express';
import { createUser, editUser, getAllUsers, getOneUser, loginUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.put('/edit/:id', editUser);
router.post('/', createUser);
router.post('/signin', loginUser);

export default router;