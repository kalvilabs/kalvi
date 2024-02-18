import { AuthPage } from "@repo/ui/components";

export default function LoginPage() {
  return (
    <AuthPage.PageWrapper
      pageTitle="Forgot Password"
      cardTitle="Forgot Password"
      cardDescription="Enter you details to get it"
    >
      <AuthPage.InputsWrapper>
        <AuthPage.InputField
          fieldName="Email"
          type="email"
          placeholder="Email"
        />
      </AuthPage.InputsWrapper>
      <AuthPage.FooterWrapper>
        <AuthPage.ButtonElement contentIn="Request Change"/>
      </AuthPage.FooterWrapper>
    </AuthPage.PageWrapper>
  );
}