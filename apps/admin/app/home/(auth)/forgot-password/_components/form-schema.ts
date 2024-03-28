import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Email must be valid" }),
});

export type TFormSchema = z.infer<typeof formSchema>;