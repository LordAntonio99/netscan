"use client";

import { useEffect } from "react";
import Features from "./_components/Features";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import Pricing from "./_components/Pricing";

export default function Home() {
  useEffect(() => {
    document.title = "NetScan - Automated IT Asset Management";

    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();

      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href) return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
    </div>
  );
}
