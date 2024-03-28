"use client";

import { AuthPage } from "@repo/ui/components";
import { formSchema, TFormSchema } from "./form-schema";
import { useForm } from "react-hook-form";
import { ReactForm } from "@repo/ui/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Linktag } from "@repo/ui/partials";
import Link from "next/link";


export function ResetPasswordForm() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "example@gmail.com",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    console.log("Submitted");
  };

  return (
    <>
      <AuthPage.FormHeader
        cardTitle="Reset Your Password"
        cardDescriptionComponent={
          <span>
            Your new password must be different from previous used passwords.
          </span>
        }
      />
      <ReactForm.Form {...form}>
        <AuthPage.FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
          <ReactForm.FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <ReactForm.FormItem>
                <ReactForm.FormLabel>Email</ReactForm.FormLabel>
                <ReactForm.FormControl>
                  <Input type="email" disabled {...field} />
                </ReactForm.FormControl>
                <ReactForm.FormMessage />
              </ReactForm.FormItem>
            )}
          />
          <ReactForm.FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <ReactForm.FormItem>
                <ReactForm.FormLabel>Password</ReactForm.FormLabel>
                <ReactForm.FormControl>
                  <Input type="password" {...field} />
                </ReactForm.FormControl>
                <ReactForm.FormMessage />
              </ReactForm.FormItem>
            )}
          />
          <ReactForm.FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <ReactForm.FormItem>
                <ReactForm.FormLabel>Confirm Password</ReactForm.FormLabel>
                <ReactForm.FormControl>
                  <Input type="password" {...field} />
                </ReactForm.FormControl>
                <ReactForm.FormMessage />
              </ReactForm.FormItem>
            )}
          />
          <AuthPage.FormFooter isMarginTop>
          <AuthPage.FooterFlexLine>
            <Button type="submit">Reset Password</Button>
            <Link href="/home/login" passHref legacyBehavior>
              <Linktag textSize="sm">Back to Sign In</Linktag>
            </Link>
            </AuthPage.FooterFlexLine>
            <ReactForm.FormRootError />
          </AuthPage.FormFooter>
        </AuthPage.FormWrapper>
      </ReactForm.Form>
    </>
  );
}
