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

const UserMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = authClient.useSession();
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
        <div className="flex flex-row items-center gap-x-2 hover:bg-secondary px-4 py-2 rounded-md transition-all">
          <Avatar className="border-2">
            <AvatarImage src={session?.user.image || ""} />
            <AvatarFallback>
              {session?.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{session?.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {session?.user.email}
            </p>
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
        className="border-none bg-background flex flex-col"
      >
        Menu goes
        <Button variant={"destructive"} onClick={handleSignOut}>
          Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
