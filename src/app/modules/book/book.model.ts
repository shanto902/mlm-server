import { model, Schema } from 'mongoose';
import { TBook } from './book.interface';

const bookSchema = new Schema<TBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    description: { type: String },
    libraryVans: [
      {
        libraryVanId: {
          type: Schema.Types.ObjectId,
          ref: 'LibraryVan',
          required: true,
        },
        stock: { type: Number, required: true, min: 0 },
      },
    ],
    price: { type: Number, required: true, min: 0 },
    publishedYear: { type: String, default: null },
    ISBN: { type: String, unique: true },
    language: { type: String, default: 'English' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook for duplicate book handling
bookSchema.pre('save', async function (next) {
  const existingBook = await BookModel.findOne({
    ISBN: this.ISBN,
  });

  if (existingBook) {
    const error = new Error('Book with this ISBN already exists');
    return next(error);
  }
  next();
});

bookSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const BookModel = model<TBook>('Book', bookSchema);
