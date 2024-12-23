import { SidebarLayout } from "@/web/components/sidebar-layout";
import { SidebarProvider } from "@repo/ui/src/components/sidebar";

const EmployeesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  return (
    <SidebarProvider>
      <SidebarLayout />
      <main className="w-full p-4">{children}</main>
    </SidebarProvider>
  );
};

export default EmployeesLayout;
