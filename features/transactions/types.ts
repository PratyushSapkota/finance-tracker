import { Account, AccountWithBucket } from "../accounts/types";
import { Bucket } from "../buckets/types";
import { Category } from "../categories/types";

export type Transaction = {
  id: string;
  account_id: string;
  category_id: string;
  amount: bigint;
  date: string;
  description: string;
};

export type DetailedTransaction = Transaction & {
  category: Category;
  accountWithBucket: AccountWithBucket;
};
