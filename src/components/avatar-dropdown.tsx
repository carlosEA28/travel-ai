"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/helpers/userInitials";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

interface AvatarDropdownProps {
  name: string;
  image: string | null;
}

const AvatarDropdownComponent = ({ name, image }: AvatarDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage src={image || undefined} />
          <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut();
            window.location.reload();
          }}
          className="text-red-500 cursor-pointer "
        >
          Logout <LogOut className="w-4 h-4 " color="red" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdownComponent;
