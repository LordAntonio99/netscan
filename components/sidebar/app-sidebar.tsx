"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  BellIcon,
  BoxIcon,
  ChartPieIcon,
  CogIcon,
  HomeIcon,
  MonitorIcon,
  Package2Icon,
  Users2Icon,
} from "lucide-react";
import UserMenu from "../user/user-menu";
import Link from "next/link";
import SidebarButton from "./sidebar-button";
import UserOrganizations from "../user/user-organizations";
import { Separator } from "../ui/separator";

const AppSidebar = () => {
  return (
    <Sidebar className="bg-secondary">
      <SidebarHeader className="p-4 bg-secondary">
        <Link
          href={"/dashboard"}
          className="flex flex-row justify-start items-center hover:text-primary transition-all w-full h-full gap-x-2"
        >
          <MonitorIcon className="size-8 mt-1" />
          <h1 className="text-2xl font-bold">Synovo</h1>
        </Link>
      </SidebarHeader>
      <Separator className="bg-background" />

      <SidebarContent className="bg-secondary">
        <SidebarMenu className="p-4">
          <UserOrganizations />
        </SidebarMenu>
        <Separator className="bg-background" />
        <SidebarMenu className="p-4">
          <SidebarButton title="Dashboard" href="/dashboard" icon={HomeIcon} />
          <SidebarButton
            title="Inventory"
            href="/dashboard/inventory"
            icon={BoxIcon}
          />
          <SidebarButton
            title="Software"
            href="/dashboard/software"
            icon={Package2Icon}
          />
          <SidebarButton
            title="Users"
            href="/dashboard/users"
            icon={Users2Icon}
          />
          <SidebarButton
            title="Diagrams"
            href="/dashboard/diagrams"
            icon={ChartPieIcon}
          />
          <SidebarButton
            title="Configuration"
            href="/dashboard/configuration"
            icon={CogIcon}
          />
        </SidebarMenu>
      </SidebarContent>
      <Separator className="bg-background" />
      <SidebarFooter className="bg-secondary">
        <SidebarButton icon={BellIcon} href="#" title="Notifications" />
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
