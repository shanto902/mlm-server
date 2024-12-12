import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';
import { TMember } from './member.interface';
import { MemberModel } from './member.model';

const getAllMembersFromDB = async () => {
  const result = await MemberModel.find();
  return result;
};

const getSingleMemberFromDB = async (id: string) => {
  const result = await MemberModel.findOne({ id });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Id not found');
  }
  return result;
};

const deleteMemberFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedMember = await MemberModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedMember) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Member');
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

    return deletedMember;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};

const updateMemberFromDB = async (id: string, payload: Partial<TMember>) => {
  const { name, ...remainingMemberData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingMemberData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await MemberModel.findOneAndUpdate(
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
      'Member not found with the given ID',
    );
  }
  return result;
};
export const MemberServices = {
  getAllMembersFromDB,
  getSingleMemberFromDB,
  deleteMemberFromDB,
  updateMemberFromDB,
};
