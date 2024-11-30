import { z } from 'zod';

// Define the name schema
const nameValidationSchema = z.object({
  firstName: z.string().min(1, 'First Name is Required').trim(),
  middleName: z.string().min(1, 'Middle Name is Required').trim(),
  lastName: z.string().min(1, 'Last Name is Required').trim(),
});

// Define the librarian schema
const librarianValidationSchema = z.object({
  id: z.string().min(1, 'ID is Required'),
  password: z.string().min(6, 'Password is Required'),
  name: nameValidationSchema,
  gender: z
    .enum(['male', 'female', 'other'], {
      errorMap: () => ({
        message: "The gender field can only be 'male', 'female', or 'other'",
      }),
    })
    .refine((value) => value !== undefined, 'Gender is Required'),
  dateOfBirth: z.string(),
  email: z.string().email('Invalid email format').min(1, 'Email is Required'),
  contactNo: z.string().min(1, 'Contact No is Required'),
  isActive: z.enum(['active', 'blocked']).default('active'),
  permanentAddress: z.string().min(1, 'Permanent Address is Required').trim(),
  presentAddress: z.string().min(1, 'Present Address is Required').trim(),
  profileImg: z.string(),
  isDeleted: z.boolean().optional(),
});

export default librarianValidationSchema;
