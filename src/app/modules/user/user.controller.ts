import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

import { StatusCodes } from 'http-status-codes';

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
