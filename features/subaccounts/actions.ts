"use server";

import { Unauthorized, userExists } from "@/lib/require-user";

export async function createSubAccount(formData: FormData) {
  const subAccountName = formData.get("subAccountName") as string;
  const accountId = formData.get("accountId") as string;

  const { error, supabase, user } = await userExists();

  if (error || !user) {
    throw new Unauthorized("");
  }

  const { error: insertError } = await supabase.from("sub_accounts").insert({
    user_id: user.id,
    account_id: accountId,
    name: subAccountName,
  });

  if (insertError) {
    throw insertError;
  }
}
