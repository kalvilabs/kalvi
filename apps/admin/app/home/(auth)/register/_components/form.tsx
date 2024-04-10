"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthPage, AuthProviderButton } from "@repo/ui/components";
import { Button, Input, Linktag, Textbox } from "@repo/ui/partials";
import { ReactForm } from "@repo/ui/forms";

import { REGISTER_URL } from "@/api-routes";
import {
  TRegistrationErrorResponse,
  TRegistrationSuccessResponse,
} from "@/types";
import { authCookieSetter } from "@/actions";
import { formSchema, TFormSchema } from "./form-schema";

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

  const onSubmit = async() => {
    const data = {
      email: form.getValues("email"),
      password: form.getValues("password"),
      name: `${form.getValues("firstName")} ${form.getValues("lastName")}`,
    };

    try {
      const response = await axios.post<TRegistrationSuccessResponse>(
        REGISTER_URL,
        data
      );
      authCookieSetter({
        access: response.data.token.access,
        refresh: response.data.token.refresh,
      });
      // TODO: Successful registration popup
    } catch (e) {
      const er = e as AxiosError<TRegistrationErrorResponse>;
      if (!er.response) return;
        const error = er.response.data
        if (error) {
          error.email &&
            form.setError("email", {
              type: "server",
              message: error.email[0],
            });
          error.password &&
            form.setError("password", {
              type: "server",
              message: error.password[0],
            });
          error.name &&
            form.setError("firstName", {
              type: "server",
              message: error.name[0],
            });
          error.errors &&
            form.setError("root", {
              type: "server",
              message: error.errors,
            });
        }

    }
  };

  return (
    <>
      <AuthPage.FormHeader
        cardTitle="Create your Free Account"
        cardDescriptionComponent={
          <span>
            Already have an account?{" "}
            <Link href="/home/login" legacyBehavior passHref>
              <Linktag textSize="sm">Sign In</Linktag>
            </Link>
          </span>
        }
      />
      <ReactForm.Form {...form}>
        <AuthPage.FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
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
