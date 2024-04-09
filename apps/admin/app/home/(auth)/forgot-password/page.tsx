import { Metadata } from "next";
import { ForgotPasswordForm } from "./_components/form";

export const metadata: Metadata = {
  title: "KalviOS | Forgot Password",
  description: "Forgot password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
