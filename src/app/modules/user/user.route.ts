import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-librarian', UserControllers.createLibrarian);

export const UserRoutes = router;
