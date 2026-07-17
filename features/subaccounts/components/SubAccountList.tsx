import { getSubAccounts } from "../queries";
import { SubAccountCreate } from "./SubAccountCreate";

export async function SubAccountList() {
  const subAccounts = await getSubAccounts();
  return (
    <div className="flex flex-col gap-2">
      {subAccounts.map((subAccount) => (
        <div
          key={subAccount.id}
          style={{ backgroundColor: subAccount.accounts.color }}
          className="border-2 border-black p-1"
        >
          {subAccount.name} {subAccount.balance}
        </div>
      ))}
    </div>
  );
}
