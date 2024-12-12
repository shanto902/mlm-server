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

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Admin created successfully',
    data: result,
  });
});

const createMember = catchAsync(async (req, res) => {
  const { password, member: memberData } = req.body;

  const result = await UserServices.createMemberIntoDB(password, memberData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Member created successfully',
    data: result,
  });
});

export const UserControllers = {
  createLibrarian,
  createAdmin,
  createMember,
};
