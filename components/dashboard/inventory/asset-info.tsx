"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import { getAssetById } from '@/server/assets'
import { toast } from 'sonner'
import AssetTypeDisplay from '@/components/asset-type-display'
import Loading from '@/components/loading'
import AssetStateDisplay from '@/components/asset-status-display'

const AssetInfo = () => {
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
    <Table>
        <TableBody>
            <TableRow className='border'>
                <TableCell rowSpan={3} className='border'>
                    <div className='flex flex-col'>
                        <span className='text-muted-foreground font-semibold uppercase'>Asset type</span> 
                        <AssetTypeDisplay assetKey={data?.assetType} /> 
                        <span className='text-muted-foreground font-semibold'>Domain:</span> 
                        <span>{data?.domain || "-"}</span>
                    </div>
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>OS</span>       
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>Windows</span>       
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>IP Location</span>
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>Spain</span>
                </TableCell>
            </TableRow>
            <TableRow className='border'>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>MAC Address</span> 
                </TableCell>
                <TableCell className='border'>
                    <span>{data?.macAddress || "-"}</span>
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>DNS Name</span> 
                </TableCell>
                <TableCell className='border'>
                    <span>{data?.dnsName || "-"}</span>
                </TableCell>
            </TableRow>

            <TableRow className='border'>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>State</span> 
                </TableCell>
                <TableCell className='border'>
                    <AssetStateDisplay statusKey={data?.state} />
                </TableCell>
                <TableCell className='border'>
                        <span className='text-muted-foreground font-semibold uppercase'>FQDN</span> 
                </TableCell>
                <TableCell className='border'>
                        <span className=''>{data?.fqdn || "-"}</span>
                </TableCell>
            </TableRow>

            <TableRow className='border'>
                <TableCell className='border' rowSpan={2}>
                    <span className='text-muted-foreground font-semibold uppercase'>MANUFACTURER</span>  
                    <span>{data?.manufacturer}</span>
                </TableCell>
                <TableCell className='border'><span className='text-muted-foreground font-semibold uppercase'>Model</span></TableCell>
                <TableCell className='border'>{data?.model || "-"}</TableCell>
                <TableCell className='border'><span className='text-muted-foreground font-semibold uppercase'>Memory</span></TableCell>
                <TableCell className='border'>-</TableCell>

            </TableRow>

            <TableRow className='border'>
                <TableCell><span className='text-muted-foreground font-semibold uppercase'>Serial Number</span> </TableCell>
                <TableCell>{data?.serialNumber || "-"}</TableCell>
                <TableCell><span className='text-muted-foreground font-semibold uppercase'>Processor</span></TableCell>
                <TableCell>-</TableCell>
            </TableRow>


            <TableRow className='border'>
                <TableCell className='border' rowSpan={2}>
                    <span className='text-muted-foreground font-semibold uppercase'>Warranty end date</span> 
                    <span>{data?.warrantyEndDate?.toLocaleDateString()}</span>
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>System SKU</span>
                </TableCell>
                <TableCell className='border'>
                    <span>{data?.systemSKU || "-"}</span>
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>ESXi Server</span>
                </TableCell>
                <TableCell className='border'>
                    -
                </TableCell>
            </TableRow>
            <TableRow className='border'>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>Express Code</span>
                </TableCell>
                <TableCell className='border'>
                    <span className='text-muted-foreground font-semibold uppercase'>SCCM Server</span>
                </TableCell>
            </TableRow>
            <TableRow className='border'>
                <TableCell className='border' rowSpan={2}>SSH Server</TableCell>
                <TableCell className='border'>HTTP Server</TableCell>
                <TableCell className='border'>FTP</TableCell>
            </TableRow>
            <TableRow className='border'>
                <TableCell className='border'>HTTP Title</TableCell>
                <TableCell className='border'>SMTP</TableCell>
            </TableRow>
        </TableBody>
    </Table>
  )
}

export default AssetInfo