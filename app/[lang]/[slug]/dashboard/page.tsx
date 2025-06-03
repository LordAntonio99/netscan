import AssetCard from "@/components/dashboard/asset-card";
import PageHeader from "@/components/page-header";
import {
  BoxIcon,
  ClockIcon,
  HardDriveIcon,
  ShieldAlertIcon,
  ShieldIcon,
  TriangleAlertIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="w-full h-full">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your assets."
      />
      <div className="flex flex-wrap gap-4">
        <div className="flex-grow basis-[calc(12.5%-1rem)] ">
          <AssetCard
            title="Total assets"
            icon={HardDriveIcon}
            value={521}
            message="+12% from last month"
          />
        </div>
        <div className="flex-grow basis-[calc(12.5%-1rem)]">
          <AssetCard title="Software Installed" icon={BoxIcon} value={2842} />
        </div>
        <div className="flex-grow basis-[calc(12.5%-1rem)]">
          <AssetCard title="Total users" icon={UsersIcon} value={521} />
        </div>
        <div className="flex-grow basis-[calc(12.5%-1rem)]">
          <AssetCard
            title="Scanning assets"
            icon={TriangleAlertIcon}
            value={23}
          />
        </div>
        <div className="flex-grow basis-[calc(12.5%-1rem)]">
          <AssetCard title="New devices (7d)" icon={ZapIcon} value={18} />
        </div>
        <div className="flex-grow basis-[calc(12.5%-1rem)]">
          <AssetCard title="Unscanned (30d)" icon={ClockIcon} value={45} />
        </div>
        <div className="flex-grow basis-[calc(12.5%-1rem)]">
          <AssetCard title="Out of Warranty" icon={ShieldIcon} value={34} />
        </div>
        <div className="flex-grow basis-[calc(12.5%-1rem)]">
          <AssetCard
            title="Antivirus Disabled"
            icon={ShieldAlertIcon}
            value={12}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
