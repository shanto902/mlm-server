import mongoose from 'mongoose';

import config from '../../config';
import { TLibrarian } from '../librarian/librarian.interface';
import { LibrarianModel } from '../librarian/librarian.model';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import generateUniqueId from '../../utils/generateUniqueId';
import { TAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';
import { TMember } from '../member/member.interface';
import { MemberModel } from '../member/member.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createLibrarianIntoDB = async (
  file: any,
  password: string,
  payload: TLibrarian,
) => {
  const userData: Partial<IUser> = {};
  //  if password is not given, use default password
  userData.password = password || (config.default_password as string);
  userData.email = payload.email;
  // set librarian role
  userData.role = 'librarian';

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    userData.id = await generateUniqueId(userData.role as string);
    // create a user

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newLibrarian = await LibrarianModel.create([payload], { session });
    if (!newLibrarian.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create librarian');
    }
    await session.commitTransaction();
    await session.endSession();

    return newLibrarian;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error?.message);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<IUser> = {};
  //  if password is not given, use default password
  userData.password = password || (config.default_password as string);
  userData.email = payload.email;
  // set librarian role
  userData.role = 'admin';

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    userData.id = await generateUniqueId(userData.role as string);
    // create a user
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await AdminModel.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error?.message);
  }
};

const createMemberIntoDB = async (password: string, payload: TMember) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);
  userData.email = payload.email;
  // set Member role
  userData.role = 'member';
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    userData.id = await generateUniqueId(userData.role as string);
    // create a user
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newMember = await MemberModel.create([payload], { session });
    if (!newMember.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create Member');
    }
    await session.commitTransaction();
    await session.endSession();

    return newMember;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error?.message);
  }
};
export const UserServices = {
  createLibrarianIntoDB,
  createAdminIntoDB,
  createMemberIntoDB,
};
