import { AuthPage } from "@repo/ui/components";

export default function RegistrationPage() {
  return (
    <AuthPage.PageWrapper pageTitle="Register" cardTitle="Register" cardDescription="Enter your password to get a reset link">
      <AuthPage.InputsWrapper>
        <AuthPage.InputField fieldName="Email" type="email" />
      </AuthPage.InputsWrapper>
      <AuthPage.FooterWrapper>
        <AuthPage.ButtonElement contentIn="Send Reset Link" />
      </AuthPage.FooterWrapper>
    </AuthPage.PageWrapper>
  );
}