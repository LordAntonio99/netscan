import NewAssetForm from '@/components/dashboard/inventory/new-asset-form'
import PageHeader from '@/components/page-header'
import React from 'react'

const NewAssetPage = () => {
  return (
    <div>
      <PageHeader title='New asset' description='Fill all the information needed to create a new asset in your organization' />
      <div className='max-w-5xl'>
      <NewAssetForm />
      </div>
    </div>
  )
}

export default NewAssetPage