import { z } from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .max(100, 'Category name cannot exceed 100 characters')
      .optional(),
    description: z
      .string()
      .max(500, 'Description cannot exceed 500 characters')
      .optional(),
    isActive: z.boolean().default(true), // Default value is true
  }),
});

export const CategoryValidations = {
  categoryValidationSchema,
};
