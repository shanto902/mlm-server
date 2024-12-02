import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomerServices } from './customer.service';
import { StatusCodes } from 'http-status-codes';

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomerServices.getAllCustomersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Customer retrieved successfully',
    data: result,
  });
});

const getSingleCustomer = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const result = await CustomerServices.getSingleCustomerFromDB(customerId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Customer retrieved successfully',
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const result = await CustomerServices.deleteCustomerFromDB(customerId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Customer Deleted successfully',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const { customer: customerData } = req.body;
  const result = await CustomerServices.updateCustomerFromDB(
    customerId,
    customerData,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Customer Updated successfully',
    data: result,
  });
});

export const CustomerControllers = {
  getAllCustomers,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
};
