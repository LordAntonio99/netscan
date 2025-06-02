"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import assetSchema from '@/schemas/zod/asset-schema'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon, Loader2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import { createAsset } from '@/server/assets'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { assetTypes } from '@/constants/asset-types'
import AssetTypeDisplay from "@/components/asset-type-display";

const NewAssetForm = () => {
  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
  })

  async function onSubmit(values: z.infer<typeof assetSchema>) {
    console.log(values)
    try {
      const newAsset = await createAsset(values)
      if (newAsset.error) {
        toast.error(newAsset.error.message)
        return
      }
    toast.success(`${newAsset.success.content.assetName} created!`)
    } catch(err) {
      console.error(err)
      toast.error("Unhandled error")
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 w-full gap-4'>
        <FormField
        control={form.control}
        name='assetName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asset name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              This name will identify the asset
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='manufacturer'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Manufacturer</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='model'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Model</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='assetType'
        render={({ field }) => {
          return(
          <FormItem className="flex flex-col">
              <FormLabel>Asset type</FormLabel>
              <Popover >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value                         ? 
                        <AssetTypeDisplay  assetKey={assetTypes.find(
                            (type) => type.key === field.value
                          )?.key as string} />
                        : "Select language"}
                      <ChevronsUpDownIcon className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {assetTypes.map((asset) => {
                          return (
                          <CommandItem
                            value={asset.title}
                            key={asset.key}
                            onSelect={() => {
                              form.setValue("assetType", asset.key)
                            }}
                          >
                            <div className='w-full flex justify-between items-center'>
                            <AssetTypeDisplay assetKey={asset.key} />

                            <CheckIcon
                              className={cn(
                                "ml-auto",
                                asset.key === field.value
                                ? "opacity-100"
                                : "opacity-0"
                              )}
                              />
                              </div>
                          </CommandItem>
                        )})}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
        )}}
        />
        <FormField
        control={form.control}
        name='serialNumber'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Serial number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='state'
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
          control={form.control}
          name="warrantyEndDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "P")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name='systemSKU'
        render={({ field }) => (
          <FormItem>
            <FormLabel>System SKU</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='ipAddress'
        render={({ field }) => (
          <FormItem>
            <FormLabel>IP address</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='macAddress'
        render={({ field }) => (
          <FormItem>
            <FormLabel>MAC address</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormDescription>
              Brief description to identify the asset (max. 500 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='domain'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Domain</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='dnsName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>DNS name</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='fqdn'
        render={({ field }) => (
          <FormItem>
            <FormLabel>FQDN</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className='animate-spin' /> : "Create"}
        </Button>
      </form>
    </Form>
  )
}

export default NewAssetForm