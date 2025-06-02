"use client"
import { DataTable } from "@/components/data-table";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { authClient } from "@/lib/auth-client";
import { AssetListColumns } from "@/schemas/tables/AssetListColumns";
import { getAllAssets } from "@/server/assets";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const InventoryPage = () => {
  const org = authClient.useActiveOrganization()
  const {data, isLoading} = useQuery({
    queryKey: ["assets", org.data?.id],
    queryFn: async () => {
      return await getAllAssets()
    }
  })

  
  return (<div>
    <PageHeader title="Inventory" description="The Inventory is your centralized hub for all discovered and manually added assets in your environment." />
    {
      isLoading  ? <Loading /> :  <DataTable columns={AssetListColumns} data={data?.success?.content ||[]} />
    }
  </div>)
};

export default InventoryPage;
