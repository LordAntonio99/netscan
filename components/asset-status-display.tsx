import React from 'react'
import { Badge } from "@/components/ui/badge"
import { assetStatus } from '@/constants/asset-status';
import { cn } from '@/lib/utils';

interface AssetStatusDisplayProps {
  statusKey: string;
}
const AssetStateDisplay = ({statusKey}: AssetStatusDisplayProps) => {
    const state = assetStatus.find((st) => st.key === statusKey)
    if (!state) {
        return null
    }
  return (
    <Badge className={cn(state.background, state.color, "flex items-center justify-center gap-x-2 w-fit select-none")}>
        <div className={cn(state.dot, "aspect-square w-2 h-2 rounded-full")} />
        <span className='font-black uppercase'>
        {state.label}
        </span>
    </Badge>
  )
}

export default AssetStateDisplay