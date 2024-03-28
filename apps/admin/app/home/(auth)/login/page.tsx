import { LoginForm } from "./_components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KalviOS | Sign In",
  description: "Sign in to KalviOS",
};

export default function LoginPage() {
  return <LoginForm />;
}
