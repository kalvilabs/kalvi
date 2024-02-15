/**
 * Component to abstract the dependencies and classes of the app layout
 */
export function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-screen w-full">{children}</main>;
}
