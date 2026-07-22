"use server";

import { getUserIfExists } from "@/lib/require-user";
import { getAccountsWithBucket } from "../accounts/queries";
import { DetailedTransaction, Transaction } from "./types";
import { getCategories } from "../categories/queries";
import { AccountWithBucket } from "../accounts/types";
import { Category } from "../categories/types";

export async function getTransactions(): Promise<DetailedTransaction[]> {
  const { user, supabase } = await getUserIfExists();

  const accountsWithBucket = await getAccountsWithBucket();
  const accountsWithBucketMap: Record<string, AccountWithBucket> =
    Object.fromEntries(
      accountsWithBucket.map((account) => [account.id, account]),
    );

  const categories = await getCategories();
  const categoriesMap: Record<string, Category> = Object.fromEntries(
    categories.map((category) => [category.id, category]),
  );

  const { data: transactionsData, error: transactionsQueryError } =
    await supabase
      .from("transactions")
      .select(
        `
      id,
      account_id,
      category_id,
      amount,
      date: occurred_on,
      description: transaction_description
      `,
      )
      .overrideTypes<Transaction[]>();

  if (transactionsQueryError) {
    throw transactionsQueryError;
  }

  console.log(transactionsData);

  const detailedTransaction: DetailedTransaction[] = transactionsData.map(
    (transaction) => ({
      ...transaction,
      category: categoriesMap[transaction.category_id],
      accountWithBucket: accountsWithBucketMap[transaction.account_id],
    }),
  );

  return detailedTransaction;
}
