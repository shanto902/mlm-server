import { z } from 'zod';

// Define the name schema
const nameValidationSchema = z.object({
  firstName: z.string().min(1, 'First Name is Required').trim(),
  middleName: z.string().min(1, 'Middle Name is Required').trim(),
  lastName: z.string().min(1, 'Last Name is Required').trim(),
});

// Define the librarian schema
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: nameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: () => ({
            message:
              "The gender field can only be 'male', 'female', or 'other'",
          }),
        })
        .refine((value) => value !== undefined, 'Gender is Required'),
      dateOfBirth: z.string(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is Required'),
      contactNo: z.string().min(1, 'Contact No is Required'),
      permanentAddress: z
        .string()
        .min(1, 'Permanent Address is Required')
        .trim(),
      presentAddress: z.string().min(1, 'Present Address is Required').trim(),
      profileImg: z.string(),
    }),
  }),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: nameValidationSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: () => ({
            message:
              "The gender field can only be 'male', 'female', or 'other'",
          }),
        })
        .refine((value) => value !== undefined, 'Gender is Required')
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is Required')
        .optional(),
      contactNo: z.string().min(1, 'Contact No is Required').optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent Address is Required')
        .trim()
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present Address is Required')
        .trim()
        .optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
