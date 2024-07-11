import express from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidationSchema.js'
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', ValidateSchema(Schemas.admin.register), register);
router.post('/login',  ValidateSchema(Schemas.admin.login), login);

export default router;
