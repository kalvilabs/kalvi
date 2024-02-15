import { AuthPage } from "@repo/ui/components";

export default function LoginPage() {
  return (
    <AuthPage.PageWrapper pageTitle="Login" cardTitle="Login">
      <AuthPage.InputsWrapper>
        <AuthPage.InputField fieldName="Username" type="text" />
        <AuthPage.InputField fieldName="Password" type="password" />
      </AuthPage.InputsWrapper>
      <AuthPage.FooterWrapper>
        <AuthPage.ButtonElement contentIn="Login" />
        <AuthPage.FooterContent>
          If you don't have an account, create one.
        </AuthPage.FooterContent>
      </AuthPage.FooterWrapper>
    </AuthPage.PageWrapper>
  );
}
