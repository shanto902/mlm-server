import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { BookControllers } from './book.controller';
import { BookValidations } from './book.validation';

const router = express.Router();

router.post(
  '/add-book',
  validateRequest(BookValidations.bookValidationSchema),
  BookControllers.addBook,
);
router.get('/', BookControllers.getAllBooks);
router.get('/:bookId', BookControllers.getSingleBook);
router.delete('/:bookId', BookControllers.deleteBook);

export const BookRoutes = router;
