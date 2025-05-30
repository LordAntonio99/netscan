"use client";

import OrganizationConfiguration from "@/components/dashboard/configuration/OrganizationConfiguration";
import { Button } from "@/components/ui/button";
import { BriefcaseBusinessIcon, ScanEyeIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Menus = [
  {
    icon: BriefcaseBusinessIcon,
    name: "Organization",
    key: "organization",
    component: <OrganizationConfiguration />,
  },
  {
    icon: ScanEyeIcon,
    name: "Agents",
    key: "agents",
    component: <></>,
  },
];

const ConfigurationPage = () => {
  const searchParams = useSearchParams();
  const active = searchParams.get("active") || "organization";

  return (
    <div className="w-full h-full flex space-x-4">
      <aside className="bg-secondary w-12 h-full rounded-md">
        {Menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <Link
              href={"/dashboard/configuration?active=" + menu.key}
              key={menu.key}
            >
              <Button
                className="w-12 h-12"
                variant={menu.key == active ? "default" : "ghost"}
              >
                <Icon className="w-12 h-12" />
              </Button>
            </Link>
          );
        })}
      </aside>
      <div className="w-full h-full rounded-md bg-secondary px-4">
        {Menus.find((menu) => menu.key === active)?.component}
      </div>
    </div>
  );
};

export default ConfigurationPage;
