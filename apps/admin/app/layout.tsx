import type { Metadata } from "next";
import "@repo/tailwind-config/css";
import { ApplicationLayout } from "@repo/ui/components";

export const metadata: Metadata = {
  title: "Admin App",
  description: "An portal to manage the LMS site on",
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
