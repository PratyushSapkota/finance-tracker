import { getTextColor } from "@/utils/text-color";
import { getBuckets } from "../queries";

export async function BucketsList() {
  const buckets = await getBuckets();
  return (
    <div>
      {buckets.map((bucket) => (
        <div
          className="w-fit p-2"
          key={bucket.id}
          style={{
            background: bucket.color,
            color: getTextColor(bucket.color),
          }}
        >
          {bucket.name}
        </div>
      ))}
    </div>
  );
}
