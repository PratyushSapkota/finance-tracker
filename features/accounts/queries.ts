import { getUserIfExists } from "@/lib/require-user";
import { Account, AccountWithBucket } from "./types";

export async function getAccounts() {
  const { user, supabase } = await getUserIfExists();

  const { data, error: queryError } = await supabase.from("accounts").select();

  if (queryError) {
    throw queryError;
  }

  return data as Account[];
}

export async function getAccountsWithBucket() {
  const { user, supabase } = await getUserIfExists();
  const { data: accountsWithBucket, error: accountsQueryError } = await supabase
    .from("accounts")
    .select(
      `
    id,
    name,
    balance,
    closed,
    buckets (
      id,
      name,
      color,
      currency
    )
    `,
    )
    .overrideTypes<AccountWithBucket[]>();

  if (accountsQueryError) {
    throw accountsQueryError;
  }

  return accountsWithBucket;
}
