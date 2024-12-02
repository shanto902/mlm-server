import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';
import { TCustomer } from './customer.interface';
import { CustomerModel } from './customer.model';

const getAllCustomersFromDB = async () => {
  const result = await CustomerModel.find();
  return result;
};

const getSingleCustomerFromDB = async (id: string) => {
  const result = await CustomerModel.findOne({ id });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Id not found');
  }
  return result;
};

const deleteCustomerFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedCustomer = await CustomerModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedCustomer) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete customer');
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedCustomer;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};

const updateCustomerFromDB = async (
  id: string,
  payload: Partial<TCustomer>,
) => {
  const { name, ...remainingLibrarianData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingLibrarianData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await CustomerModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Customer not found with the given ID',
    );
  }
  return result;
};
export const CustomerServices = {
  getAllCustomersFromDB,
  getSingleCustomerFromDB,
  deleteCustomerFromDB,
  updateCustomerFromDB,
};
