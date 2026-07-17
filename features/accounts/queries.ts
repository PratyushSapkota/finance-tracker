import "server-only";
import { Unauthorized, userExists } from "@/lib/require-user";
import { Account } from "@/features/accounts/type";

export async function getAccounts() {
  const { user, supabase, error } = await userExists();

  if (!user || error) {
    throw new Unauthorized("");
  }

  const { data, error: queryError } = await supabase.from("accounts").select();

  if (queryError) {
    throw queryError;
  }

  return data as Account[];
}
