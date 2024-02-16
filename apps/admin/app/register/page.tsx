import { AuthPage } from "@repo/ui/components";

export default function RegistrationPage() {
  return (
    <AuthPage.PageWrapper pageTitle="Register" cardTitle="Register">
      <AuthPage.InputsWrapper>
        <AuthPage.InputField fieldName="First Name" type="text" />
        <AuthPage.InputField fieldName="Last Name" type="text" />
        <AuthPage.InputField fieldName="Email" type="email" />
        <AuthPage.InputField fieldName="Password" type="password" />
        <AuthPage.InputField fieldName="Confirm Password" type="password" />
        <AuthPage.InputField fieldName="Password" type="password" />
      </AuthPage.InputsWrapper>
      <AuthPage.FooterWrapper>
        <AuthPage.ButtonElement contentIn="Register" />
        <AuthPage.FooterContent>
          If you already have an account, login here
        </AuthPage.FooterContent>
      </AuthPage.FooterWrapper>
    </AuthPage.PageWrapper>
  );
}
