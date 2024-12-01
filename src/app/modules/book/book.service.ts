import { TBook } from './book.interface';
import { BookModel } from './book.model';

const addBookIntoDB = async (payload: TBook) => {
  // add a book into db

  const newBook = await BookModel.create(payload);
  return newBook;
};

export const BookServices = {
  addBookIntoDB,
};
