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
import { useParams } from "next/navigation";

const AppSidebar = () => {
  const {slug} = useParams()

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
        {
          !slug ? (
    <div>
      <SidebarMenu className="p-4">
          <UserOrganizations />
        </SidebarMenu>
      <p className="px-4">Select an organization to start</p>
    </div>
      ) : (
        <>
        <SidebarMenu className="p-4">
          <UserOrganizations />
        </SidebarMenu>
        <Separator className="bg-background" />
        <SidebarMenu className="p-4">
         <SidebarButton title="Dashboard" href={`/${slug}/dashboard`} icon={HomeIcon} />
<SidebarButton title="Inventory" href={`/${slug}/dashboard/inventory`} icon={BoxIcon} />
<SidebarButton title="Software" href={`/${slug}/dashboard/software`} icon={Package2Icon} />
<SidebarButton title="Users" href={`/${slug}/dashboard/users`} icon={Users2Icon} />
<SidebarButton title="Diagrams" href={`/${slug}/dashboard/diagrams`} icon={ChartPieIcon} />
<SidebarButton title="Configuration" href={`/${slug}/dashboard/configuration`} icon={CogIcon} />
        </SidebarMenu>
            </>
      )
        }
        
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
