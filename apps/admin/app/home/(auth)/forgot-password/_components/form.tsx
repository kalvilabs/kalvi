"use client";

import { AuthPage } from "@repo/ui/components";
import { formSchema, TFormSchema } from "./form-schema";
import { useForm } from "react-hook-form";
import { ReactForm } from "@repo/ui/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Linktag, Textbox } from "@repo/ui/partials";
import Link from "next/link";

export function ForgotPasswordForm() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    console.log('Submitted');
  }



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
                  <Input type="email" {...field} />
                </ReactForm.FormControl>
                <ReactForm.FormMessage />
              </ReactForm.FormItem>
            )}
          />
          <AuthPage.FormFooter isMarginTop>
            <Button type="submit" columnSpan={2} width="full">
              Send Link
            </Button>
          </AuthPage.FormFooter>
        </AuthPage.FormWrapper>
      </ReactForm.Form>
      <AuthPage.PageFooterWrapper>
        <Textbox variant="description">
          Already have an account?{" "}
          <Link href="/home/login" legacyBehavior passHref>
            <Linktag textSize="sm">Return to Sign In</Linktag>
          </Link>
        </Textbox>
      </AuthPage.PageFooterWrapper>
    </>
  );
}
