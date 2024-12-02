import mongoose from 'mongoose';
import { LibrarianModel } from './librarian.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';
import { TLibrarian } from './librarian.interface';

const getAllLibrariansFromDB = async () => {
  const result = await LibrarianModel.find();
  return result;
};

const getSingleLibrarianFromDB = async (id: string) => {
  const result = await LibrarianModel.findOne({ id });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Id not found');
  }
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

const updateLibrarianFromDB = async (
  id: string,
  payload: Partial<TLibrarian>,
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
  const result = await LibrarianModel.findOneAndUpdate(
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
      'Librarian not found with the given ID',
    );
  }
  return result;
};
export const LibrarianServices = {
  getAllLibrariansFromDB,
  getSingleLibrarianFromDB,
  deleteLibrarianFromDB,
  updateLibrarianFromDB,
};
