"use client";

import { AuthPage, AuthProviderButton } from "@repo/ui/components";
import { formSchema, TFormSchema } from "./form-schema";
import { useForm } from "react-hook-form";
import { ReactForm } from "@repo/ui/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Linktag, Textbox } from "@repo/ui/partials";
import Link from "next/link";



export function RegisterationForm() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const submitfunction = () => {
    console.log("Submitted");
  };

  return (
    <>
      <AuthPage.FormHeader
        cardTitle="Create your Free Account"
        cardDescriptionComponent={
          <span>
            Already have an account?{" "}
            <Link href="/login" legacyBehavior passHref>
              <Linktag textSize="sm">Sign In</Linktag>
            </Link>
          </span>
        }
      />
      <ReactForm.Form {...form}>
        <AuthPage.FormWrapper onSubmit={form.handleSubmit(submitfunction)}>
          <ReactForm.FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <ReactForm.FormItem width="half">
                <ReactForm.FormLabel>First Name</ReactForm.FormLabel>
                <ReactForm.FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    {...field}
                  />
                </ReactForm.FormControl>
                <ReactForm.FormMessage />
              </ReactForm.FormItem>
            )}
          />
          <ReactForm.FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <ReactForm.FormItem width="half">
                <ReactForm.FormLabel>Last Name</ReactForm.FormLabel>
                <ReactForm.FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    {...field}
                  />
                </ReactForm.FormControl>
                <ReactForm.FormMessage />
              </ReactForm.FormItem>
            )}
          />
          <ReactForm.FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <ReactForm.FormItem>
                <ReactForm.FormLabel>Email</ReactForm.FormLabel>
                <ReactForm.FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </ReactForm.FormControl>
                <ReactForm.FormMessage />
              </ReactForm.FormItem>
            )}
          />
          <AuthPage.FormFooter>
            <Textbox variant="description">
              By signing up, you agree to our{" "}
              <Linktag textSize="sm">Terms of Use</Linktag> and{" "}
              <Linktag textSize="sm">Privacy Policy</Linktag>.
            </Textbox>
            <Button columnSpan={2} width="full" type="submit">
              Register
            </Button>
          </AuthPage.FormFooter>
        </AuthPage.FormWrapper>
      </ReactForm.Form>
      <AuthPage.PageFooterWrapper dividerTxt="or sign in with" divider>
        <AuthProviderButton provider="google" columnSpan={2} width="full" />
        <AuthProviderButton provider="github" columnSpan={2} width="full" />
      </AuthPage.PageFooterWrapper>
    </>
  );
}
