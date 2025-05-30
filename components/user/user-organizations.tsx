import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { ChevronLeft, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const UserOrganizations = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: organizations, isPending } = authClient.useListOrganizations();
  const {
    data: activeOrganization,
    isPending: isPendingActiveOrg,
    isRefetching: isRefetchingActiveOrg,
  } = authClient.useActiveOrganization();

  const handleOrganizationSelect = async (orgId: string) => {
    try {
      const { data, error } = await authClient.organization.setActive({
        organizationId: orgId,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(`Switched to ${data.name}`);
      setOpen(false);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {isPendingActiveOrg || isRefetchingActiveOrg ? (
          <div className="px-4 flex items-center space-x-2">
            <Skeleton className="size-10 aspect-square rounded-full" />
            <Skeleton className="w-full h-4 rounded-full" />
          </div>
        ) : !activeOrganization ? (
          <Button
            className="w-full flex justify-between"
            variant={"ghost"}
            disabled={isPending}
          >
            <p>Organization name</p>
            <ChevronLeft
              className={cn(open ? "rotate-180" : "rotate-0", "transition-all")}
            />
          </Button>
        ) : (
          <Button
            key={activeOrganization.id}
            className="w-full flex justify-between items-center"
            variant={"ghost"}
          >
            <div className="flex justify-start items-center space-x-2">
              <Avatar>
                <AvatarImage src={activeOrganization.logo || ""} />
                <AvatarFallback>
                  {activeOrganization.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p>{activeOrganization.name}</p>
            </div>
            <ChevronLeft
              className={cn(open ? "rotate-180" : "rotate-0", "transition-all")}
            />
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
        side="right"
        className="ml-3 bg-secondary border border-background p-0 flex flex-col"
      >
        {organizations?.length === 0 && (
          <div className="w-full flex justify-center py-4">
            <span>No organizations joined</span>
          </div>
        )}
        <div className="flex flex-col">
          {organizations?.map((org) => (
            <Button
              key={org.id}
              className="w-full h-12 flex justify-start items-center select-none"
              disabled={org.id === activeOrganization?.id}
              variant={"ghost"}
              onClick={() => handleOrganizationSelect(org.id)}
            >
              <Avatar>
                <AvatarImage src={org.logo || ""} />
                <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p>{org.name}</p>
            </Button>
          ))}
          <Link href={"/organizations/create"} className="select-none">
            <Button
              className="w-full h-12 flex justify-start"
              variant={"ghost"}
              size={"lg"}
            >
              <PlusIcon />
              Create organization
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserOrganizations;
