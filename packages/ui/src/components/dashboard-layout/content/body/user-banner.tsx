import { Avatar } from "../../../../partials/avatar";

export interface DashboardUserInformationProps {
  nameComponent: React.ReactNode;
  imageComponent: React.ReactNode;
}

export const DashboardUserInformation = ({
  imageComponent,
  nameComponent,
}: DashboardUserInformationProps) => {
  return (
    <div className="flex space-x-5 flex-1 flex-shrink-0">
      <div>{imageComponent}</div>
      <div>{nameComponent}</div>
    </div>
  );
};
