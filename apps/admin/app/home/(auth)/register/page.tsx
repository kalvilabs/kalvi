import { Metadata } from "next";
import { RegisterationForm } from "./_components/form";


export const metadata: Metadata = {
  title: "KalviOS | Register",
  description: "Register to KalviOS",
};

export default function RegisterPage() {
  return <RegisterationForm />;
}
