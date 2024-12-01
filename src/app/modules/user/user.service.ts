import generateUniqueId from '../../../utils/generateUniqueId';
import config from '../../config';
import { TLibrarian } from '../librarian/librarian.interface';
import { LibrarianModel } from '../librarian/librarian.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createLibrarianIntoDB = async (
  password: string,
  librarianData: TLibrarian,
) => {
  const userData: Partial<TUser> = {};
  //  if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set librarian role
  userData.role = 'librarian';

  userData.id = await generateUniqueId(userData.role as string);
  // create a user
  const newUser = await UserModel.create(userData);
  if (Object.keys(newUser).length) {
    librarianData.id = newUser.id;
    librarianData.user = newUser._id;

    const newLibrarian = await LibrarianModel.create(librarianData);
    return newLibrarian;
  }
};

export const UserServices = {
  createLibrarianIntoDB,
};
