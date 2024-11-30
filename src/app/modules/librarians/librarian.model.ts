import { model, Schema } from 'mongoose';
import { ILibrarianModel, TLibrarian, TName } from './librarian.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const librarianNameSchema = new Schema<TName, ILibrarianModel>(
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

const librarianSchema = new Schema<TLibrarian>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {
      type: librarianNameSchema,
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
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
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

librarianSchema.pre('save', async function (next) {
  // Hashing Password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const librarian = this;
  librarian.password = await bcrypt.hash(
    librarian.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

librarianSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await LibrarianModel.findOne({ id });
  return existingUser;
};

librarianSchema.post('save', async function (doc, next) {
  doc.password = 'Password saved In encrypted format';
  next();
});

//Filtering deleted accounts
librarianSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

librarianSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
});

export const LibrarianModel = model<TLibrarian, ILibrarianModel>(
  'Librarian',
  librarianSchema,
);
