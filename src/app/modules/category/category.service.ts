import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';

const addCategoryIntoDb = async (payload: TCategory) => {
  // add a book into db

  const newBook = await CategoryModel.create(payload);
  return newBook;
};

const getAllCategoriesFromDb = async () => {
  const allCategories = await CategoryModel.find();
  return allCategories;
};

export const CategoryServices = {
  addCategoryIntoDb,
  getAllCategoriesFromDb,
};
