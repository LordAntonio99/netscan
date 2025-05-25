"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AppleIcon,
  ArrowRightIcon,
  LockIcon,
  MailIcon,
  MonitorIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center text-primary"
        >
          <MonitorIcon className="h-10 w-10" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-secondary py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-muted-foreground rounded-md placeholder-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-muted-foreground rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" name="remember-me" />
                <Label htmlFor="remember-me" className="ml-2 block text-sm ">
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" variant="default" className="w-full">
                Sign in <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted-foreground" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-muted-foreground bg-secondary">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  /* Handle Microsoft login */
                }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"
                  />
                </svg>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  /* Handle Google login */
                }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 11v2h5.5c-.2 1.3-1.3 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.4 1.8 14.4.8 12 .8 6.5.8 2 5.3 2 10.8s4.5 10 10 10c5.8 0 9.6-4.1 9.6-9.8 0-.7-.1-1.2-.2-1.8H12z"
                  />
                </svg>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  /* Handle Apple login */
                }}
              >
                <AppleIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
