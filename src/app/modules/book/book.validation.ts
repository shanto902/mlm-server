import { z } from 'zod';

const bookValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    stock: z.number(),
    price: z.number(),
  }),
});

export const bookValidations = {
  bookValidationSchema,
};
