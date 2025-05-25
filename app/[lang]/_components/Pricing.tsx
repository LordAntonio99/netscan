import { Button } from "@/components/ui/button";
import { CheckIcon, HelpCircleIcon } from "lucide-react";
import React, { useState } from "react";

interface PlanFeature {
  feature: string;
  tooltip?: string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  highlighted?: boolean;
}

const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: billing === "monthly" ? "$2" : "$1.50",
      description:
        "Perfect for small businesses just getting started with asset management.",
      features: [
        { feature: "Up to 100 assets" },
        { feature: "Basic asset discovery" },
        { feature: "Real-time monitoring" },
        { feature: "Email alerts" },
        { feature: "Cloud access" },
        { feature: "8 hours support (business days)" },
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Business",
      price: billing === "monthly" ? "$1.50" : "$1.20",
      description:
        "Ideal for growing businesses with expanding IT infrastructure.",
      features: [
        { feature: "101-500 assets" },
        { feature: "Advanced asset discovery" },
        { feature: "Real-time monitoring" },
        { feature: "Email and SMS alerts" },
        { feature: "Cloud access with API" },
        {
          feature: "24/7 priority support",
          tooltip: "Support available 24/7 including weekends and holidays",
        },
        {
          feature: "Custom reports",
          tooltip:
            "Create and schedule custom reports based on your requirements",
        },
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: billing === "monthly" ? "$1" : "$0.80",
      description: "For large organizations with complex IT environments.",
      features: [
        { feature: "500+ assets" },
        { feature: "Enterprise-grade discovery" },
        { feature: "Real-time monitoring" },
        { feature: "Advanced alerting system" },
        { feature: "Full API access" },
        { feature: "24/7 dedicated support" },
        { feature: "Custom integration" },
        {
          feature: "On-premise option",
          tooltip:
            "Option to deploy on your own infrastructure for added security",
        },
      ],
      cta: "Contact Sales",
    },
  ];
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Transparent <span className="text-orange-500">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Pay only for the assets we detect. No hidden fees, no complicated
            pricing structures.
          </p>
          <div className="inline-flex items-center bg-gray-800 p-1 rounded-lg mb-8">
            <Button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all`}
              variant={billing === "monthly" ? "default" : "outline"}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setBilling("annual")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all`}
              variant={billing === "annual" ? "default" : "outline"}
            >
              Annual (20% off)
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800 rounded-xl overflow-hidden transition-all ${
                plan.highlighted
                  ? "border-2 border-orange-500 scale-105 shadow-xl shadow-orange-500/10 relative"
                  : "border border-gray-700"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">per asset/month</span>
                </div>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <Button
                  variant={plan.highlighted ? "default" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
              <div className="bg-gray-850 p-8 border-t border-gray-700">
                <p className="font-medium text-white mb-4">Features include:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature.feature}</span>
                      {feature.tooltip && (
                        <div className="group relative ml-1">
                          <HelpCircleIcon className="h-4 w-4 text-gray-500 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-gray-300 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                            {feature.tooltip}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a custom solution?
          </h3>
          <p className="text-gray-300 mb-6">
            We offer custom pricing and features for organizations with specific
            requirements. Contact our sales team to discuss your needs.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
