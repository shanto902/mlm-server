import express from 'express';
import validateRequest from '../middleware/validateRequest';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post('/login', validateRequest(AuthValidations.loginValidationSchema));
