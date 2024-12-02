import { ObjectId } from 'mongoose';

export type TBook = {
  id: string;
  title: string;
  author: string;
  categories: ObjectId[];
  description?: string;
  libraryVans?: {
    libraryVanId: ObjectId;
    stock: number;
  }[];
  price: number;
  publishedYear?: number;
  ISBN?: string;
  language?: string;
  isDeleted?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
