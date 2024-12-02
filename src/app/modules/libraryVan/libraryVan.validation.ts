import { z } from 'zod';

const createLibraryVanValidationSchema = z.object({
  body: z.object({
    libraryVanId: z.string(),
    status: z
      .enum(['active', 'inactive', 'in-maintenance'])
      .default('active')
      .optional(),
  }),
});

export const LibraryVanValidations = {
  createLibraryVanValidationSchema,
};
