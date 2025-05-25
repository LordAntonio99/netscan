import { BarChartIcon, SearchIcon, WifiIcon, ZapIcon } from "lucide-react";
import React from "react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}
const Step: React.FC<StepProps> = ({
  number,
  title,
  description,
  icon,
  isLast = false,
}) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl">
          {number}
        </div>
        {!isLast && (
          <div className="h-full w-0.5 bg-gradient-to-b from-primary to-accent my-2"></div>
        )}
      </div>
      <div className="ml-6">
        <div className="flex items-center mb-2">
          <div className="mr-3 p-2 bg-background rounded-lg text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-8">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Connect to Your Network",
      description:
        "Our system connects to your network using a small secure appliance or through your existing infrastructure. No complex setup required.",
      icon: <WifiIcon className="h-6 w-6" />,
    },
    {
      number: 2,
      title: "Automatic Discovery",
      description:
        "NetScan automatically discovers all devices connected to your network, identifying their type, specifications, and installed software.",
      icon: <SearchIcon className="h-6 w-6" />,
    },
    {
      number: 3,
      title: "Real-time Monitoring",
      description:
        "Monitor the status of all your IT assets in real-time. Get alerts for new devices, status changes, or potential security issues.",
      icon: <BarChartIcon className="h-6 w-6" />,
    },
    {
      number: 4,
      title: "Immediate Results",
      description:
        "Start gaining insights into your IT infrastructure within minutes of setup. Generate reports, track changes, and optimize your assets.",
      icon: <ZapIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-primary">NetScan</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in minutes with our simple four-step process
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
        <div className="mt-16 max-w-2xl mx-auto bg-background p-8 rounded-lg border border-muted-foreground/20">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            See it in action
          </h3>
          <div className="aspect-video bg-accent rounded-lg mb-6 flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center">
              <svg
                className="w-16 h-16 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Video demonstration</p>
            </div>
          </div>
          <p className="text-muted-foreground text-center">
            Watch how NetScan discovers and monitors your entire IT
            infrastructure in minutes without installing any software on
            individual devices.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
