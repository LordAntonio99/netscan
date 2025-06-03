"use client";
import { generateSlug } from "@/app/lib/slug";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import organizationSchema from "@/schemas/zod/organization-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const OrganizationConfiguration = () => {
  const { data, isPending } = authClient.useActiveOrganization();
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      logo: data?.logo || "",
      name: data?.name || "",
      slug: data?.slug || "",
      disclaimerTitle: "",
      disclaimerMessage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof organizationSchema>) {
    console.log(values);
    try {
      const { error } = await authClient.organization.update({
        data: {
          logo: values.logo,
          name: values.name,
          slug: values.slug,
        },
        organizationId: data?.id,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Organization updated");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    form.setValue("logo", data?.logo || "");
    form.setValue("name", data?.name || "");
    form.setValue("slug", data?.slug || "");
    form.setValue("disclaimerTitle", data?.disclaimerTitle || "");
    form.setValue("disclaimerMessage", data?.disclaimerMessage || "");
  }, [data]);

  const logo = form.watch("logo");
  const name = form.watch("name");
  const slug = form.watch("slug");

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name) {
        const slug = generateSlug(value.name);
        form.setValue("slug", slug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  if (isPending || !data?.id) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        title="Organization configuration"
        description="Manage your organization configuration"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-row w-full">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Name for the new organization that will be created
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormDescription>
                      Convention name for url and links
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      URL for the image displayed on the menus and public pages
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-8 w-full h-full flex items-center justify-center">
              <div className="flex flex-row items-center gap-x-4 border w-fit px-8 py-4 rounded-md">
                <Avatar className="size-24">
                  <AvatarImage src={logo} className="object-cover" />
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{name}</h1>
                  <p className="text-lg text-muted-foreground">{slug}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Separator className="mb-8" />
            <FormField
              control={form.control}
              name="disclaimerTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disclaimer title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here the title of the disclaimer..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disclaimerMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disclaimer title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a disclaimer message (max. 1000 characters)"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className="mt-8" />
            <Button
              className="mt-8"
              disabled={
                !form.formState.isDirty ||
                form.formState.isSubmitted ||
                form.formState.isSubmitting
              }
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrganizationConfiguration;
