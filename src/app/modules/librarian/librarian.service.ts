import mongoose from 'mongoose';
import { LibrarianModel } from './librarian.model';
import AppError from '../../../middleware/appError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';

const getAllLibrariansFromDB = async () => {
  const result = await LibrarianModel.find();
  return result;
};

const getSingleLibrarianFromDB = async (id: string) => {
  const result = await LibrarianModel.findOne({ id });
  return result;
};

const deleteLibrarianFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedLibrarian = await LibrarianModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedLibrarian) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete librarian');
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

    return deletedLibrarian;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};
export const LibrarianServices = {
  getAllLibrariansFromDB,
  getSingleLibrarianFromDB,
  deleteLibrarianFromDB,
};
