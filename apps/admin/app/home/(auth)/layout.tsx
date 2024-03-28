import { AuthPage } from "@repo/ui/components";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthPage.PageWrapper>{children}</AuthPage.PageWrapper>;
}
