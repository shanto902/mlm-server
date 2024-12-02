import express from 'express';
import { UserControllers } from './user.controller';
import { LibrarianValidations } from '../librarian/librarian.validation';
import validateRequest from '../../middleware/validateRequest';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-librarian',
  validateRequest(LibrarianValidations.createLibrarianValidationSchema),
  UserControllers.createLibrarian,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
