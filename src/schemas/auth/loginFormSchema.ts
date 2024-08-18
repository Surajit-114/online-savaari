import { z } from "zod";
export const loginFormSchema = z.object({
  username: z.string().min(2, "This field is required"),
  password: z.string().min(2, "This field is required"),
});

export type TLoginFormSchema = z.infer<typeof loginFormSchema>