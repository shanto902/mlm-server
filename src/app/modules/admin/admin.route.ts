import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);
router.get('/:adminId', AdminControllers.getSingleAdmin);
router.delete('/:adminId', AdminControllers.deleteAdmin);
router.patch('/:adminId', AdminControllers.updateAdmin);

export const AdminRoute = router;
