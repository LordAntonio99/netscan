import { LucideIcon } from "lucide-react";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AssetCardProps {
  title: string;
  icon: LucideIcon;
  value: number;
  unit?: string;
  message?: string;
}

const AssetCard = ({ title, icon, value, unit, message }: AssetCardProps) => {
  const Icon = icon;
  return (
    <Card className="group h-full hover:border-primary transition-all cursor-default select-none">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-muted-foreground whitespace-nowrap mb-3">
              {title}
            </CardTitle>
            <CardDescription className="text-white text-4xl font-bold">
              {value} <span>{unit}</span>
            </CardDescription>
          </div>
          <Icon className="size-10 p-2 group-hover:bg-primary transition-all rounded-md flex-shrink-0 ml-8" />
        </div>
      </CardHeader>
      <CardFooter>
        <span className="text-xs text-emerald-500">{message}</span>
      </CardFooter>
    </Card>
  );
};

export default AssetCard;
