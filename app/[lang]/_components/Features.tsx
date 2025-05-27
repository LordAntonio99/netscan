import {
  BarChartIcon,
  ClockIcon,
  CloudIcon,
  LayersIcon,
  MonitorIcon,
  ShieldIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-accent p-6 rounded-lg border border-transparent hover:border-primary transition-colors group">
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const t = useTranslations("Features");

  const features = [
    {
      title: t("zero-installation"),
      description: t("zero-installation-desc"),
      icon: <ZapIcon className="h-6 w-6" />,
    },
    {
      title: t("automatic-discovery"),
      description: t("automatic-discovery-desc"),
      icon: <MonitorIcon className="h-6 w-6" />,
    },
    {
      title: t("monitor"),
      description: t("monitor-desc"),
      icon: <ClockIcon className="h-6 w-6" />,
    },
    {
      title: t("dashboard"),
      description: t("dashboard-desc"),
      icon: <BarChartIcon className="h-6 w-6" />,
    },
    {
      title: t("security"),
      description: t("security-desc"),
      icon: <ShieldIcon className="h-6 w-6" />,
    },
    {
      title: t("cloud"),
      description: t("cloud-desc"),
      icon: <CloudIcon className="h-6 w-6" />,
    },
    {
      title: t("scalable"),
      description: t("scalable-desc"),
      icon: <LayersIcon className="h-6 w-6" />,
    },
    {
      title: t("team"),
      description: t("team-desc"),
      icon: <UsersIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title1")} <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
