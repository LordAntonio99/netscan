import AssetStateDisplay from "@/components/asset-status-display";
import AssetTypeDisplay from "@/components/asset-type-display";
import { Button } from "@/components/ui/button";
import { Asset } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";


export const getAssetListColumns = (slug: string): ColumnDef<Asset>[] => [
  {
    accessorKey: "assetName",
    header: "NAME",
    cell: ({ row }) => {
      return (
        <Link href={`/${slug}/dashboard/inventory/${row.original.id}`}>
        <Button size={"sm"} variant={"ghost"}>
          {row.original.assetName}
        </Button>
        </Link>
      )
    }
  },
  {
    accessorKey: "assetType",
    header: "TYPE",
    cell: ({ row }) => {
      return (
        <AssetTypeDisplay assetKey={row.original.assetType} />
      )
    }
  },
  {
    accessorKey: "domain",
    header: "DOMAIN",
  },
  {
    accessorKey: "ipAddress",
    header: "IP ADDRESS",
  },
  {
    accessorKey: "macAddress",
    header: "MAC ADDRESS",
  },
  {
    accessorKey: "manufacturer",
    header: "MANUFACTURER",
  },
  {
    accessorKey: "model",
    header: "MODEL",
  },
  {
    accessorKey: "serialNumber",
    header: "SERIAL NUMBER",
  },
  {
    accessorKey: "state",
    header: "STATE",
    cell: ({row}) => {
      const state = row.original.state

      return <AssetStateDisplay statusKey={state} />
    }
  },
  {
  accessorKey: "createdAt",
  header: "CREATED AT",
  cell: ({ row }) => {
    const date = new Date(row.original.createdAt);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
                          `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

    return <span>{formattedDate}</span>;
  }
}
]
