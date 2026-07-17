"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

function UserMenu({
  signedEmail,
  isSettings,
}: {
  signedEmail: string | undefined;
  isSettings: boolean;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="lg">
          {signedEmail}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Sign out
          </DropdownMenuItem>
          {!isSettings ? (
            <DropdownMenuItem
              onClick={() => {
                router.push("/settings");
              }}
            >
              Settings
            </DropdownMenuItem>
          ) : (
            <></>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
