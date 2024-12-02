import QueryBuilder from '../../builder/queryBuilder';
import { bookSearchableField } from './book.constant';
import { TBook } from './book.interface';
import { BookModel } from './book.model';

const addBookIntoDB = async (payload: TBook) => {
  // add a book into db

  const newBook = (await BookModel.create(payload)).populate('categories');
  return newBook;
};

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const bookQuery = new QueryBuilder(
    BookModel.find()
      .populate('categories')
      .populate('libraryVans.libraryVanId'),
    query,
  )
    .search(bookSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookQuery.modelQuery;
  return result;
};

const getSingleBookFromDb = async (id: string) => {
  const bookData = await BookModel.findById(id).populate('categories');
  return bookData;
};

const deleteBookFromDb = async (id: string) => {
  const result = await BookModel.updateOne({ _id: id }, { isDeleted: true });
  return result;
};
export const BookServices = {
  addBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDb,
  deleteBookFromDb,
};
