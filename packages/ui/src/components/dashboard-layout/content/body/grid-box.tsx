import { cn } from "../../../../lib/tw-class-merge";

export interface DashboardContentGridBoxProps {
  children: React.ReactNode;
}

export const DashboardContentGridBox = ({
  children,
}: DashboardContentGridBoxProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};

export const DashboardGridBoxContent = ({
  children,
}: DashboardContentGridBoxProps) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export interface DashboardGridBoxContentProps {
  mainTitleFontWeight?: "normal" | "medium";
  mainTitle: React.ReactNode;
  sideTitle: React.ReactNode;
}

export const DashboardGridBoxContentTitle = ({
  mainTitle,
  mainTitleFontWeight = "normal",
  sideTitle,
}: DashboardGridBoxContentProps) => {
  return (
    <div className="flex justify-between">
      <dt
        className={cn(
          "text-sm leading-6 inline-flex space-x-2",
          mainTitleFontWeight === "normal" ? "font-normal" : "font-semibold"
        )}
      >
        {mainTitle}
      </dt>
      <dd className="text-xs font-medium">{sideTitle}</dd>
    </div>
  );
};
