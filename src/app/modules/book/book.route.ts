import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookControllers } from './book.controller';
import { BookValidations } from './book.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidations.bookValidationSchema),
  auth(USER_ROLE.librarian, USER_ROLE.admin),
  BookControllers.addBook,
);
router.get('/', BookControllers.getAllBooks);
router.get('/:bookId', BookControllers.getSingleBook);
router.delete(
  '/:bookId',
  auth(USER_ROLE.librarian, USER_ROLE.admin),
  BookControllers.deleteBook,
);

export const BookRoutes = router;
