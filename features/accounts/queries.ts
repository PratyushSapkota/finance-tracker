import { getUserIfExists } from "@/lib/require-user";
import { Account } from "./types";

export async function getAccounts() {
  const { user, supabase } = await getUserIfExists();

  const { data, error: queryError } = await supabase.from("accounts").select();

  if (queryError) {
    throw queryError;
  }

  return data as Account[];
}
