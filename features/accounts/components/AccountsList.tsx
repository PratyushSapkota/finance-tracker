import { getBuckets } from "@/features/buckets/queries";
import { getAccounts } from "../queries";
import { getTextColor } from "@/utils/text-color";

export async function AccountsList() {
  const accounts = await getAccounts();
  const buckets = await getBuckets();

  let bucketToColor: Record<string, string> = {};
  buckets.map((bucket) => {
    bucketToColor[bucket.id] = bucket.color;
  });

  return (
    <div className="">
      {accounts.map((account) => (
        <div
          key={account.id}
          style={{
            background: bucketToColor[account.bucket_id],
            color: getTextColor(bucketToColor[account.bucket_id]),
          }}
          className="p-2"
        >
          {account.name} {account.balance}
        </div>
      ))}
    </div>
  );
}
