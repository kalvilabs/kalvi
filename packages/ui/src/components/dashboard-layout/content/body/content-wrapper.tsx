export interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContentWrapper({ children }: DashboardContentProps) {
  return (
    <main className="space-y-8 p-4 h-[calc(100%-4rem)] overflow-y-auto">
      {children}
    </main>
  );
}

export function DashboardContentSection({ children }: DashboardContentProps) {
  return <section className="space-y-5">{children}</section>;
}
