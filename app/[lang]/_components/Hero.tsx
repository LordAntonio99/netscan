"use client";
import { Button } from "@/components/ui/button";
import { SearchCheckIcon, ServerIcon, ShieldIcon, ZapIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-background to-accent overflow-hidden">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex flex-col lg:flex-row items-center">
          <div
            className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="badge mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <ZapIcon className="mr-1 h-3.5 w-3.5" />
              No installation required
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Effortless <span className="text-primary">IT Asset</span>{" "}
              Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              Automatically discover and monitor all assets on your network
              without installing software on endpoint devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <SearchCheckIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <p className="text-gray-300">Instant network discovery</p>
              </div>
              <div className="flex items-start">
                <ShieldIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <p className="text-gray-300">Enterprise-grade security</p>
              </div>
              <div className="flex items-start">
                <ServerIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <p className="text-gray-300">Cloud-based platform</p>
              </div>
              <div className="flex items-start">
                <ZapIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <p className="text-gray-300">Setup in minutes</p>
              </div>
            </div>
          </div>
          {/* Pantalla */}
          <div
            className={`lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-lg blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-secondary p-6 rounded-lg border border-muted shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-orange-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    NetScan Dashboard
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-8 bg-accent-foreground/20 rounded w-full"></div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-accent-foreground/20 p-3 rounded">
                      <div className="text-sm text-white">Total Assets</div>
                      <div className="text-2xl font-bold text-white">156</div>
                    </div>
                    <div className="bg-accent-foreground/20 p-3 rounded">
                      <div className="text-sm text-white">Online</div>
                      <div className="text-2xl font-bold text-green-500">
                        142
                      </div>
                    </div>
                    <div className="bg-accent-foreground/20 p-3 rounded">
                      <div className="text-sm text-white">Issues</div>
                      <div className="text-2xl font-bold text-orange-500">
                        14
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-10 bg-accent-foreground/20 rounded w-full"></div>
                    <div className="h-10 bg-accent-foreground/20 rounded w-full"></div>
                    <div className="h-10 bg-accent-foreground/20 rounded w-full"></div>
                  </div>

                  <div className="h-32 bg-accent-foreground/20 rounded w-full"></div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="h-8 bg-primary rounded flex items-center justify-center text-sm font-medium">
                    Scan Network
                  </div>
                  <div className="h-8 bg-accent-foreground/20 rounded flex items-center justify-center text-sm font-medium">
                    Generate Report
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
