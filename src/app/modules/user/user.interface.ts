import { Model } from 'mongoose';

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  email: string;
  role: 'admin' | 'librarian' | 'customer';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
}

export interface UserFunctions extends Model<IUser> {
  isUserExistsByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
