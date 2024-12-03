import { model, Schema } from 'mongoose';

import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { TAdmin } from './admin.interface';
import { TName } from '../librarian/librarian.interface';
const adminNameSchema = new Schema<TName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is Required'],
      trim: true,
    },
    middleName: {
      type: String,
      required: [true, 'Middle Name is Required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is Required'],
      trim: true,
    },
  },
  { _id: false },
);

const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: adminNameSchema,
      required: [true, 'Name is Required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not valid, The gender field can be only be following 'male' , 'female', 'other'",
      },
      required: [true, 'Gender is Required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'DateOfBirth is Required'],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email is Required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact No is Required'],
    },

    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is Required'],
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is Required'],
      trim: true,
    },
    profileImg: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Custom Static Method

adminSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await AdminModel.findOne({ id });
  return existingUser;
};

adminSchema.pre('save', async function (next) {
  const isEmailExists = await AdminModel.findOne({
    email: this.email,
  });

  if (isEmailExists) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This email already used');
  }
  next();
});

//Filtering deleted accounts
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
});

export const AdminModel = model<TAdmin>('Admin', adminSchema);
