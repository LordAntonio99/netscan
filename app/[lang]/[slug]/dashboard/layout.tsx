import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="w-screen h-screen">
      <AppSidebar />
      <main className="w-full h-full p-4 bg-background">{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
