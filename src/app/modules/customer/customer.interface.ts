import { Types } from 'mongoose';

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TCustomer = {
  id: string;
  nid: string;
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
