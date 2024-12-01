import { model, Schema } from 'mongoose';
import { TBook } from './book.interface';

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

bookSchema.pre('save', async function (next) {
  const isBookExists = await BookModel.findOne({
    title: this.title,
  });

  if (isBookExists) {
    throw new Error('Book Already Exists');
  }
});
export const BookModel = model<TBook>('Book', bookSchema);
