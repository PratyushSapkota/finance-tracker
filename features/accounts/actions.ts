"use server";

import { getUserIfExists } from "@/lib/require-user";

export async function createAccount(formData: FormData) {
  const { supabase, user } = await getUserIfExists();

  const name = formData.get("createAccountName") as string;
  const bucket_id = formData.get("createAccountBucket") as string;

  const { error: insertError } = await supabase.from("accounts").insert({
    user_id: user.id,
    name: name,
    bucket_id: bucket_id,
  });

  if (insertError) {
    throw insertError;
  }
}
