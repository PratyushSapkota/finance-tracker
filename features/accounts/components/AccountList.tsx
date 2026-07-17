import { Button } from "@/components/ui/button";
import { getAccounts } from "../queries";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { AccountCard } from "./AccountCard";

export async function Accounts() {
  const accounts = await getAccounts();

  return (
    <div className="flex w-fit gap-2">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
