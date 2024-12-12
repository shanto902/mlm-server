import express from 'express';
import { UserControllers } from './user.controller';
import { LibrarianValidations } from '../librarian/librarian.validation';
import validateRequest from '../../middleware/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import { MemberValidations } from '../member/member.validation';

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

router.post(
  '/create-member',
  validateRequest(MemberValidations.createMemberValidationSchema),
  UserControllers.createMember,
);
export const UserRoutes = router;
