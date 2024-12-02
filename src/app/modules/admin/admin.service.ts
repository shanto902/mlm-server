import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';
import { AdminModel } from './admin.model';
import { TAdmin } from './admin.interface';

const getAllAdminsFromDB = async () => {
  const result = await AdminModel.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findOne({ id });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Id not found');
  }
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedAdmin = await AdminModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Admin');
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

    return deletedAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};

const updateAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await AdminModel.findOneAndUpdate(
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
      'Admin not found with the given ID',
    );
  }
  return result;
};
export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminFromDB,
};
