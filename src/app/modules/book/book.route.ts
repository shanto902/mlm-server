import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { BookControllers } from './book.controller';
import { bookValidations } from './book.validation';

const router = express.Router();

router.post(
  '/add-book',
  validateRequest(bookValidations.bookValidationSchema),
  BookControllers.addBook,
);

export const BookRoutes = router;
