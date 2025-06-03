"use client"
import { DataTable } from "@/components/data-table";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { AssetListColumns } from "@/schemas/tables/AssetListColumns";
import { getAllAssets } from "@/server/assets";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const InventoryPage = () => {
  const { slug } = useParams()
  const {data, isLoading} = useQuery({
    queryKey: ["assets", slug],
    queryFn: async () => {
      if (!slug) return null
      return await getAllAssets(slug as string)
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
