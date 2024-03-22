export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardContentHeader({
  children,
}: DashboardLayoutProps) {
  return (
    <section className="w-full h-16 border-b border-gray-300 sticky top-0 px-4 flex items-center justify-between">
      {children}
    </section>
  );
}

export function DashboardContentHeaderContainer({
  children,
}: DashboardLayoutProps) {
  return <div className="flex items-center gap-2">{children}</div>;
}
