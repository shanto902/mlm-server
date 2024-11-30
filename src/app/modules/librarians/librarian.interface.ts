import { Model } from 'mongoose';

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TLibrarian = {
  id: string;
  password: string;
  name: TName;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isActive: 'active' | 'blocked';
  isDeleted?: boolean;
};

export interface ILibrarianModel extends Model<TLibrarian> {
  isUserExist(id: string): Promise<TLibrarian | null>;
}
