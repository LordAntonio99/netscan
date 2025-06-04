"use client"

import AssetInfo from '@/components/dashboard/inventory/asset-info'
import Loading from '@/components/loading'
import PageHeader from '@/components/page-header'
import { getAssetById } from '@/server/assets'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const AssetPage = () => {
    const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ["assets", id],
    queryFn: async () => {
        const asset = await getAssetById(id as string)
        if (asset.error) {
            toast.error(asset.error.message)
        }
        return  asset.success?.content
    }
  })

  if (!data || isLoading) {
    return <Loading />
  }
  return (
    <div>
        <PageHeader title={data.assetName} description='10.95.0.1 - 00:50:56:87:79:7F' />
        <AssetInfo />
    </div>
  )
}

export default AssetPage