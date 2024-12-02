import { Types } from 'mongoose';
import { TName } from '../librarian/librarian.interface';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TName;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted?: boolean;
};
