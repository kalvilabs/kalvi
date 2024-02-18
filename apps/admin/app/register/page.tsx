import { AuthPage } from "@repo/ui/components";

export default function RegisterPage() {
  return (
    <AuthPage.PageWrapper
      pageTitle="Register"
      cardTitle="Register"
      cardDescription="Enter you details to experience it"
    >
      <AuthPage.InputsWrapper>
        <AuthPage.InputField
          fieldName="First Name"
          type="text"
          placeholder="First Name"
        />
        <AuthPage.InputField
          fieldName="Last Name"
          type="text"
          placeholder="Last Name" />
        <AuthPage.InputField
          fieldName="Email"
          type="email"
          placeholder="Email" />
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