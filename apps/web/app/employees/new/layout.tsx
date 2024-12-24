import { SidebarLayout } from "@/web/components/sidebar-layout";
import { SidebarProvider } from "@repo/ui/src/components/sidebar";

const EmployeeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  return <>{children}</>;
};

export default EmployeeLayout;
