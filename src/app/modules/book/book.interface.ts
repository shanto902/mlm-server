import { ObjectId } from 'mongoose';

export type TBook = {
  id: string;
  title: string;
  author: string;
  categoryId: ObjectId;
  stock: number;
  libraryVanId: ObjectId;
  price: number;
};
