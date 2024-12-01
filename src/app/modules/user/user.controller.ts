import { UserServices } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';

const createLibrarian = catchAsync(async (req, res) => {
  const { password, librarian: librarianData } = req.body;

  const result = await UserServices.createLibrarianIntoDB(
    password,
    librarianData,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Librarian created successfully',
    data: result,
  });
});

export const UserControllers = {
  createLibrarian,
};
