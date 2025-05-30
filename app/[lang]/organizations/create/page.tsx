"use client";

import { generateSlug } from "@/app/lib/slug";
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
import { authClient } from "@/lib/auth-client";
import organizationSchema from "@/schemas/organization-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateOrganizationPage = () => {
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "Acme Inc.",
      slug: "acme-inc",
      logo: "https://img.freepik.com/vector-gratis/vector-diseno-degradado-colorido-pajaro_343694-2506.jpg?semt=ais_hybrid&w=740",
    },
  });

  async function onSubmit(values: z.infer<typeof organizationSchema>) {
    console.log(values);
    try {
      const { data, error } = await authClient.organization.create({
        name: values.name,
        slug: values.slug,
        logo: values.logo,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(`Organization ${data.name} succesfully created`);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name) {
        const slug = generateSlug(value.name);
        form.setValue("slug", slug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div>
      <PageHeader
        title="Create organization"
        description="Create a new organization to start tracking assets and users."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button>Create</Button>
        </form>
      </Form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Preview</h3>
        <div className="flex flex-row items-center gap-x-4 border w-fit px-8 py-4 rounded-md">
          <Avatar className="size-24">
            <AvatarImage
              src={form.getValues("logo")}
              className="object-cover"
            />
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{form.getValues("name")}</h1>
            <p className="text-lg text-muted-foreground">
              {form.getValues("slug")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;
