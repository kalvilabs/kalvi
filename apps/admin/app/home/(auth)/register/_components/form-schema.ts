import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(5, { message: "First name must contain at least 5 character(s)" }),
  lastName: z.string().optional(),
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