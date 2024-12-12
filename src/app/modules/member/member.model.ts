import { model, Schema } from 'mongoose';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { TName } from '../librarian/librarian.interface';
import { TMember } from './member.interface';
const memberNameSchema = new Schema<TName>(
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

const memberSchema = new Schema<TMember>(
  {
    id: { type: String, required: true, unique: true },
    nid: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: memberNameSchema,
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

memberSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await MemberModel.findOne({ id });
  return existingUser;
};

memberSchema.pre('save', async function (next) {
  const isMemberExists = await MemberModel.findOne({
    email: this.email,
  });

  if (isMemberExists) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This email already used');
  }
  next();
});

//Filtering deleted accounts
memberSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

memberSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
});

export const MemberModel = model<TMember>('Member', memberSchema);
