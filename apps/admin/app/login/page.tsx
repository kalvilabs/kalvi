import { AuthPage } from "@repo/ui/components";

export default function LoginPage() {
  return (
    <AuthPage.PageWrapper
      pageTitle="Login"
      cardTitle="Login"
      cardDescription="Enter you details to get it"
    >
      <AuthPage.InputsWrapper>
        <AuthPage.InputField
          fieldName="Email"
          type="email"
          placeholder="Email"
        />
        <AuthPage.InputField
          fieldName="Password"
          type="password"
          placeholder="Password" />
      </AuthPage.InputsWrapper>
      <AuthPage.FooterWrapper>
        <AuthPage.ButtonElement contentIn="Login"/>
      </AuthPage.FooterWrapper>
    </AuthPage.PageWrapper>
  );
}
