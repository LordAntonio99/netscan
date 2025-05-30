import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import organizationSchema from "@/schemas/organization-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const OrganizationConfiguration = () => {
  const { data, isPending } = authClient.useActiveOrganization();
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      logo: data?.logo || "",
      name: data?.name || "",
      slug: data?.slug || "",
    },
  });

  async function onSubmit(values: z.infer<typeof organizationSchema>) {
    console.log(values);
  }

  useEffect(() => {
    form.setValue("logo", data?.logo || "");
    form.setValue("name", data?.name || "");
    form.setValue("slug", data?.slug || "");
  }, [data]);

  if (isPending) {
    return <Loading />;
  }
  return (
    <div>
      <PageHeader
        title="Organization configuration"
        description="Manage your organization configuration"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>
      </Form>
      <Avatar>
        <AvatarImage src={form.getValues("logo")} />
      </Avatar>
    </div>
  );
};

export default OrganizationConfiguration;
