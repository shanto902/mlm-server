import { StatusCodes } from 'http-status-codes';
import { CategoryServices } from './category.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const addCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.addCategoryIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Category added successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDb();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Category Retrived successfully',
    data: result,
  });
});

export const CategoryControllers = {
  addCategory,
  getAllCategories,
};
