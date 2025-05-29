"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  href: string;
  icon: LucideIcon;
  title: string;
}

const SidebarButton = ({ href, icon, title }: SidebarButtonProps) => {
  const pathName = usePathname();

  const isActiveRoute = pathName === href || pathName.endsWith(href);

  const Icon = icon;
  return (
    <Link href={href}>
      <Button
        className="w-full h-full flex justify-start"
        variant={isActiveRoute ? "default" : "ghost"}
      >
        <Icon />
        <span>{title}</span>
      </Button>
    </Link>
  );
};

export default SidebarButton;
