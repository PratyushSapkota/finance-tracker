import { Bucket } from "../buckets/types";

export type Account = {
  id: string;
  name: string;
  bucket_id: string;
  closed: boolean;
  balance: bigint;
};


export type AccountWithBucket = Account & {
  bucket: Bucket;
};