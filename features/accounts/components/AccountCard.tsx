"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Account } from "../type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccount } from "../actions";
import { Button } from "@/components/ui/button";

export function AccountCard({ account }: { account: Account }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <div className="border-2 border-amber-950 p-1">
      <ContextMenu>
        <ContextMenuTrigger>
          <span style={{ color: account.color }}>{account.name} {account.balance}</span>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>{account.name}</ContextMenuLabel>

            <ContextMenuItem>Edit</ContextMenuItem>
            <ContextMenuItem
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                setOpenDeleteDialog(true);
              }}
            >
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete account{" "}
              <span style={{ color: account.color }}>{account.name}</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete{" "}
              <span className="font-bold">{account.name}</span> account. Are you
              sure?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form>
              <input type="hidden" name="accountId" value={account.id} />
              <AlertDialogAction
                formAction={deleteAccount}
                variant={"destructive"}
                type="submit"
              >
                Delete
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
