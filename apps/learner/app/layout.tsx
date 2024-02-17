import type { Metadata } from "next";
import "@repo/tailwind-config/css";
import { ApplicationLayout } from "@repo/ui/components";

export const metadata: Metadata = {
  title: "Learner App",
  description: "An portal for users to experience the LMS site on",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApplicationLayout>{children}</ApplicationLayout>
    </html>
  );
}
