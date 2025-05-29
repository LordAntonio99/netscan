"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  LogInIcon,
  MenuIcon,
  MonitorIcon,
  XIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = useTranslations("Header");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-sm py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MonitorIcon className="size-8 text-primary mr-2" />
            <span className="font-bold text-xl text-white">Synovo</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features">{t("features")}</Link>
            <Link href="#how-it-works">{t("how-it-works")}</Link>
            <Link href="#pricing">{t("pricing")}</Link>
            <Link href="#testimonials">{t("testimonials")}</Link>
            <Link href={"/auth/login"}>
              <Button variant="ghost" size="sm" className="mr-2">
                <LogInIcon className="h-4 w-4 mr-2" />
                {t("sign-in")}
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button variant="outline" size="sm">
                {t("get-started")} <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <a
              href="#features"
              className="block py-2 px-4 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block py-2 px-4 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block py-2 px-4 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block py-2 px-4 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <Button variant="ghost" className="mb-2 w-full">
              <LogInIcon className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="secondary" className="w-full">
              Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
