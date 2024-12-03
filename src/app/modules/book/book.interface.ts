import { ObjectId } from 'mongoose';

export type TBookCategory = {
  name: string;
};
export type TBook = {
  id: string;
  title: string;
  author: string;
  categories: [TBookCategory];
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
