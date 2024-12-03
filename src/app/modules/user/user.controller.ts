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

const createCustomer = catchAsync(async (req, res) => {
  const { password, customer: customerData } = req.body;

  const result = await UserServices.createCustomerIntoDB(
    password,
    customerData,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Customer created successfully',
    data: result,
  });
});

export const UserControllers = {
  createLibrarian,
  createAdmin,
  createCustomer,
};
