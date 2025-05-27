import { Button } from "@/components/ui/button";
import { CheckIcon, HelpCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Pricing");

  const plans: PricingPlan[] = [
    {
      name: t("Plans.Starter.name"),
      price: billing === "monthly" ? "$2" : "$1.50",
      description: t("Plans.Starter.description"),
      features: [
        { feature: t("Plans.Starter.feature1") },
        { feature: t("Plans.Starter.feature2") },
        { feature: t("Plans.Starter.feature3") },
        { feature: t("Plans.Starter.feature4") },
        { feature: t("Plans.Starter.feature5") },
        { feature: t("Plans.Starter.feature6") },
      ],
      cta: t("Plans.Starter.cta"),
    },
    {
      name: t("Plans.Business.name"),
      price: billing === "monthly" ? "$1.50" : "$1.20",
      description: t("Plans.Business.description"),
      features: [
        { feature: t("Plans.Business.feature1") },
        { feature: t("Plans.Business.feature2") },
        { feature: t("Plans.Business.feature3") },
        { feature: t("Plans.Business.feature4") },
        { feature: t("Plans.Business.feature5") },
        {
          feature: t("Plans.Business.feature6"),
          tooltip: t("Plans.Business.feature6Tooltip"),
        },
        {
          feature: t("Plans.Business.feature7"),
          tooltip: t("Plans.Business.feature7Tooltip"),
        },
      ],
      cta: t("Plans.Business.cta"),
      highlighted: true,
    },
    {
      name: t("Plans.Enterprise.name"),
      price: billing === "monthly" ? "$1" : "$0.80",
      description: t("Plans.Enterprise.description"),
      features: [
        { feature: t("Plans.Enterprise.feature1") },
        { feature: t("Plans.Enterprise.feature2") },
        { feature: t("Plans.Enterprise.feature3") },
        { feature: t("Plans.Enterprise.feature4") },
        { feature: t("Plans.Enterprise.feature5") },
        { feature: t("Plans.Enterprise.feature6") },
        { feature: t("Plans.Enterprise.feature7") },
      ],
      cta: t("Plans.Enterprise.cta"),
    },
  ];
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title1")} <span className="text-orange-500">{t("title2")}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t("subtitle")}
          </p>
          <div className="inline-flex items-center p-1 rounded-lg mb-8">
            <Button
              onClick={() => setBilling("monthly")}
              className={
                "px-4 py-2 rounded-r-none text-sm font-medium transition-all"
              }
              variant={billing === "monthly" ? "default" : "outline"}
            >
              {t("Type.monthly")}
            </Button>
            <Button
              onClick={() => setBilling("annual")}
              className={`px-4 py-2 rounded-l-none text-sm font-medium transition-all`}
              variant={billing === "annual" ? "default" : "outline"}
            >
              {t("Type.annual")}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-secondary rounded-xl overflow-hidden transition-all ${
                plan.highlighted
                  ? "border-2 border-primary scale-105 shadow-xl shadow-primary/10 relative"
                  : "border border-muted-foreground"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                  {t("popular")}
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
                  <span className="text-muted-foreground ml-2">
                    {t("count")}
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
              <div className="bg-secondary p-8 border-t border-muted-foreground">
                <p className="font-medium text-white mb-4">
                  {t("sectionTitle")}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-white">{feature.feature}</span>
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
        <div className="mt-16 max-w-2xl mx-auto bg-secondary p-8 rounded-lg border border-muted-foreground text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t("customTitle")}
          </h3>
          <p className="text-gray-300 mb-6">{t("customDescription")}</p>
          <Button variant="outline">{t("sales")}</Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
