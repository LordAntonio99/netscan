"use client";

import {
  ArrowRightIcon,
  LockIcon,
  MailIcon,
  MonitorIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import registerSchema from "@/schemas/register-schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const { email, password, fullName } = values;
    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name: fullName, // user display name
        image: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${email}`, // User image URL (optional)
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: () => {
          //show loading
          console.log("Loading");
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          console.log("Success registration");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  }
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-secondary py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-muted-foreground px-2 py-1 rounded-md focus-within:border-primary focus-within:text-primary transition-colors text-muted-foreground">
                        <UserIcon className="mr-2" />
                        <Input
                          placeholder="Enter your full name"
                          className="flex-1 border-none focus:outline-none focus:ring-0 focus-visible:ring-transparent text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-muted-foreground px-2 py-1 rounded-md focus-within:border-primary focus-within:text-primary transition-colors text-muted-foreground">
                        <MailIcon className="mr-2 " />
                        <Input
                          placeholder="Enter your mail"
                          className="flex-1 border-none focus:outline-none focus:ring-0 focus-visible:ring-transparent text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-muted-foreground px-2 py-1 rounded-md focus-within:border-primary focus-within:text-primary transition-colors text-muted-foreground">
                        <LockIcon className="mr-2 " />
                        <Input
                          placeholder="Create a password"
                          type="password"
                          className="flex-1 border-none focus:outline-none focus:ring-0 focus-visible:ring-transparent text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className="flex items-center border border-muted-foreground px-2 py-1 rounded-md focus-within:border-primary focus-within:text-primary transition-colors text-muted-foreground">
                        <LockIcon className="mr-2 " />
                        <Input
                          placeholder="Confirm password"
                          type="password"
                          className="flex-1 border-none focus:outline-none focus:ring-0 focus-visible:ring-transparent text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" size={"lg"}>
                Create account <ArrowRightIcon />
              </Button>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
