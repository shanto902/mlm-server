import express from 'express';
import { UserControllers } from './user.controller';
import { librarianValidations } from '../librarian/librarian.validation';
import validateRequest from '../../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-librarian',
  validateRequest(librarianValidations.createLibrarianValidationSchema),
  UserControllers.createLibrarian,
);

export const UserRoutes = router;
