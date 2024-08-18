import { z } from "zod";
export const signupFormSchema = z.object({
  firstname: z.string().min(2,"This field is required"),
  lastname: z.string().min(2,"This field is required"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(2,"This field is required"),
  password: z.string().min(2,"This field is required"),
  confirmPassword: z.string().min(2,"This field is required"),
});

export type TSignupFormSchema = z.infer<typeof signupFormSchema>