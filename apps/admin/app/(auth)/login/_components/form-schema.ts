import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Email must be valid" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});

export type TFormSchema = z.infer<typeof formSchema>;