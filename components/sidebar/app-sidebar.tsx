"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
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

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 ">
        <Link
          href={"/dashboard"}
          className="flex flex-row justify-start items-center hover:text-primary transition-all w-full h-full gap-x-2"
        >
          <MonitorIcon className="size-8 mt-1" />
          <h1 className="text-2xl font-bold">Synovo</h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="p-4">
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
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarButton icon={BellIcon} href="#" title="Notifications" />
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
