"use client";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

const UserMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.info(`¡Hasta luego ${session?.user.name}!`);
          router.push("/auth/login");
        },
      },
    });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className="flex flex-row items-center justify-between gap-x-2 hover:bg-secondary p-2 rounded-md transition-all max-w-[250px]"
          style={{ minWidth: "200px" }} // opcional para ancho mínimo
        >
          {isPending && (
            <Skeleton className="w-10 h-10 rounded-full aspect-square" />
          )}
          {!isPending && (
            <Avatar className="border-2">
              <AvatarImage src={session?.user.image || ""} />
              <AvatarFallback>
                {session?.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex flex-col items-start w-full truncate">
            {isPending ? (
              <Skeleton className="w-full h-4 mb-1" />
            ) : (
              <p className="font-semibold w-full truncate">
                {session?.user.name}
              </p>
            )}

            {isPending ? (
              <Skeleton className="w-[180px] h-2" />
            ) : (
              <p className="text-sm text-muted-foreground w-full truncate">
                {session?.user.email}
              </p>
            )}
          </div>

          <ChevronDown
            className={cn(
              open ? "rotate-180 transition-all" : "rotate-0 transition-all"
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="border-none flex flex-col bg-secondary shadow ml-2 p-0"
      >
        <Button
          variant={"destructive"}
          onClick={handleSignOut}
          className="w-full"
        >
          Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
