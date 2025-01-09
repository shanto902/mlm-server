import { z } from 'zod';

const libraryVanSchema = z.object({
  libraryVanId: z.string().nonempty('Library Van ID is required'),
  stock: z
    .number()
    .min(0, 'Stock cannot be negative')
    .int('Stock must be an integer'),
});

const bookValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Book title is required'),
    author: z.string().min(1, 'Author name is required'),
    categories: z.array(z.string()).optional(),
    description: z.string().optional(),
    libraryVans: z
      .array(libraryVanSchema)
      .nonempty('At least one library van entry is required'),
    price: z
      .number()
      .min(0, 'Price must be greater than or equal to 0')
      .positive('Price must be a positive number'),
    publishedYear: z.string().optional(),
    ISBN: z.string().optional(),
    language: z.string().optional(),
  }),
});

export const BookValidations = {
  bookValidationSchema,
};
