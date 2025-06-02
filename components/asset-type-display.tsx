import { assetTypes } from '@/constants/asset-types'
import Image from 'next/image'
import React from 'react'

interface AssetTypeDisplayProps {
  assetKey: string;
}

const AssetTypeDisplay = ({ assetKey }: AssetTypeDisplayProps) => {
  const asset = assetTypes.find((asset) => asset.key === assetKey);
  const label = asset?.title || "Unknown";
  const icon = asset?.iconSrc;

  return (
    <div className="flex items-center">
      {icon && (
        <Image
          src={icon}
          alt={`${label} icon`}
          className="size-8 mr-2 p-1"
        />
      )}
      <span>{label}</span>
    </div>
  );
};

export default AssetTypeDisplay;
