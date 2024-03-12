"use client";

import { AuthPage, AuthProviderButton } from "@repo/ui/components";
import { formSchema, TFormSchema } from "./form-schema";
import { useForm } from "react-hook-form";
import { ReactForm } from "@repo/ui/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  CheckboxContainer,
  Input,
  Label,
  Linktag,
} from "@repo/ui/partials";
import Link from "next/link";
import {
  TLoginErrorResponse,
  TLoginSuccessResponse,
} from "../../../../types/authentication/login";
import axios, { AxiosError } from "axios";
import { LOGIN_URL } from "../../../../api-routes";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitFunction = (data: TFormSchema) => {
    axios
      .post<TLoginSuccessResponse>(LOGIN_URL, data)
      .then((response) => {
        document.cookie = `Authorization=${response.data.token.access}`;
        document.cookie = `Refresh=${response.data.token.refresh}`;
        router.push("/dashboard");
      })
      .catch((e: AxiosError<TLoginErrorResponse>) => {
        if (!e.response) return;
        const error = e.response.data;
        if (error) {
          form.setError("root", {
            type: "server",
            message: error.errors[0],
          });
        }
      });
  };

  return (
    <>
      <AuthPage.FormHeader
        cardTitle="Sign In"
        cardDescriptionComponent={
          <span>
            Don&apos;t have an account yet?{" "}
            <Link href="/register" legacyBehavior passHref>
              <Linktag textSize="sm">Sign up</Linktag>
            </Link>
          </span>
        }
      />
      <ReactForm.Form {...form}>
        <AuthPage.FormWrapper
          onSubmit={form.handleSubmit(() => submitFunction(form.getValues()))}
        >
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
            <AuthPage.FooterFlexLine>
              <CheckboxContainer>
                <Checkbox id="remember me" />
                <Label htmlFor="remember me" variant="description">
                  Remember me
                </Label>
              </CheckboxContainer>
              <Link href="/forgot-password" legacyBehavior passHref>
                <Linktag textSize="sm">Forgot Password?</Linktag>
              </Link>
            </AuthPage.FooterFlexLine>
            <ReactForm.FormRootError />
          </AuthPage.FormFooter>
          <Button type="submit" columnSpan={2} width="full">
            Login
          </Button>
        </AuthPage.FormWrapper>
      </ReactForm.Form>
      <AuthPage.PageFooterWrapper dividerTxt="or sign in with" divider>
        <AuthProviderButton provider="google" columnSpan={2} width="full" />
        <AuthProviderButton provider="github" columnSpan={2} width="full" />
      </AuthPage.PageFooterWrapper>
    </>
  );
}
