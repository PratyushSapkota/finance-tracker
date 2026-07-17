"use server";

import { Unauthorized, userExists } from "@/lib/require-user";
import { SubAccount } from "./types";
import { getAccounts } from "../accounts/queries";

export async function getSubAccounts() {
  const { user, supabase, error } = await userExists();

  if (!user || error) {
    throw new Unauthorized("");
  }

  const { data, error: queryError } = await supabase
    .from("sub_accounts")
    .select(`*, accounts(color)`);

  if (queryError) {
    throw queryError;
  }

  return data;
}
