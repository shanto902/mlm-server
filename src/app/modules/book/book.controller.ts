import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { BookServices } from './book.service';

const addBook = catchAsync(async (req, res) => {
  const result = await BookServices.addBookIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Book added successfully',
    data: result,
  });
});

export const BookControllers = {
  addBook,
};
