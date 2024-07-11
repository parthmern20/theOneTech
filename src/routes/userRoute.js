import express from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidationSchema.js'
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { tokenChecker } from '../middleware/tokenChecker.js';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.user.create), tokenChecker, createUser);
router.get('/', tokenChecker,getAllUsers);
router.get('/:id',tokenChecker, getUserById);
router.put('/update/:id',tokenChecker,ValidateSchema(Schemas.user.update), updateUser);
router.delete('/delete/:id',tokenChecker, deleteUser);

export default router;
