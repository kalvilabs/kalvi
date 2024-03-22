

export interface DashboardSidebarContentProps {
  children: React.ReactNode;
}

export function DashboardSidebarContent({
  children,
}: DashboardSidebarContentProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden overflow-y-auto scrollbar-hidden gap-1 px-1">
      {children}
    </div>
  );
}
