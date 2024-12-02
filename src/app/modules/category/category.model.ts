import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';
import AppError from '../../../middleware/appError';
import { StatusCodes } from 'http-status-codes';

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true }, // Indicates if the category is active
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

categorySchema.pre('save', async function (next) {
  const isCategoryExists = await CategoryModel.findOne({ name: this.name });
  if (isCategoryExists) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Category Already Exists');
  }
  next();
});

export const CategoryModel = model<TCategory>('Category', categorySchema);
