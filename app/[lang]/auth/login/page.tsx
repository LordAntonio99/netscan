"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import loginSchema from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppleIcon,
  ArrowRightIcon,
  LockIcon,
  MailIcon,
  MonitorIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const t = useTranslations("LogIn");

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      if (error) {
        return toast.error(error.message);
      }

      toast.info(`Bienvenido ${data.user.name}`);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
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
        <h2 className="mt-6 text-center text-3xl font-bold">{t("title")}</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {t("subtitle")}{" "}
          <Link
            href="/auth/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            {t("create")}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-secondary py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("remember-me")}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    {t("forgot-password")}
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full flex items-center justify-center"
              >
                {t("sign-in")} <ArrowRightIcon />
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted-foreground" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-muted-foreground bg-secondary">
                  {t("continue-with")}
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
