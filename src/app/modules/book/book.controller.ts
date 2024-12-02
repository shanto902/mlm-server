import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { BookServices } from './book.service';

const addBook = catchAsync(async (req, res) => {
  const bookData = await BookServices.addBookIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Book added successfully',
    data: bookData,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const booksData = await BookServices.getAllBooksFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Books retrived Successfully',
    data: booksData,
  });
});

const getSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const bookData = await BookServices.getSingleBookFromDb(bookId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book retrived Successfully',
    data: bookData,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.deleteBookFromDb(bookId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book Deleted successfully',
    data: result,
  });
});

export const BookControllers = {
  addBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
};