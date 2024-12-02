import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';
const router = express.Router();

router.post(
  '/add-category',
  validateRequest(CategoryValidations.categoryValidationSchema),
  CategoryControllers.addCategory,
);
router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoute = router;
