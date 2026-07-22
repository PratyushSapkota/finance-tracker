import { getBuckets } from "@/features/buckets/queries";
import { getAccounts } from "../queries";
import { getTextColor } from "@/utils/text-color";
import { Bucket } from "@/features/buckets/types";
import { formatAmount } from "@/utils/amount";

export async function AccountsList() {
  const accounts = await getAccounts();
  const buckets = await getBuckets();

  let bucketData: Record<string, Bucket> = {};
  buckets.map((bucket) => {
    bucketData[bucket.id] = bucket;
  })


  return (
    <div className="">
      {accounts.map((account) => (
        <div
          key={account.id}
          style={{
            background: bucketData[account.bucket_id].color,
            color: getTextColor(bucketData[account.bucket_id].color),
          }}
          className="p-2"
        >
          <div>
            {account.name}
          </div>
          <div>
            {formatAmount(account.balance, bucketData[account.bucket_id].currency)}
          </div>
        </div>
      ))}
    </div>
  );
}
