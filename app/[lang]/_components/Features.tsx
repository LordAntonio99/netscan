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
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors group">
      <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Zero Installation",
      description:
        "No need to install software on every device. Scan and monitor your entire network without touching endpoints.",
      icon: <ZapIcon className="h-6 w-6" />,
    },
    {
      title: "Automatic Discovery",
      description:
        "Detect all devices connected to your network automatically, including servers, workstations, and IoT devices.",
      icon: <MonitorIcon className="h-6 w-6" />,
    },
    {
      title: "Real-time Monitoring",
      description:
        "Get instant alerts when new devices connect to your network or when existing assets change status.",
      icon: <ClockIcon className="h-6 w-6" />,
    },
    {
      title: "Comprehensive Dashboard",
      description:
        "Visualize your entire IT infrastructure with intuitive dashboards and detailed asset information.",
      icon: <BarChartIcon className="h-6 w-6" />,
    },
    {
      title: "Enterprise Security",
      description:
        "Ensure compliance with industry standards like GDPR, HIPAA, and ISO 27001 for secure asset management.",
      icon: <ShieldIcon className="h-6 w-6" />,
    },
    {
      title: "Cloud Access",
      description:
        "Access your asset management system from anywhere using our secure cloud-based platform.",
      icon: <CloudIcon className="h-6 w-6" />,
    },
    {
      title: "Scalable Solution",
      description:
        "Perfect for businesses of all sizes, from small startups to large enterprises with thousands of devices.",
      icon: <LayersIcon className="h-6 w-6" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Share asset information with your team and assign responsibilities for efficient management.",
      icon: <UsersIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features,{" "}
            <span className="text-orange-500">Simple Interface</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Manage your IT assets with ease using our comprehensive set of
            features designed for modern businesses.
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
