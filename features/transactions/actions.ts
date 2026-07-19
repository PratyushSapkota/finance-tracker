"use server";

import { getUserIfExists } from "@/lib/require-user";

export async function createTransaction(formData: FormData) {
  const { user, supabase } = await getUserIfExists();

  const description = formData.get("transactionDescription") as string;
  const amount = formData.get("transactionAmount");

  const data = {
    user_id: user.id,
    description: description.trim(),
    account_id: formData.get("transactionAccount") as string,
    category_id: formData.get("transactionCategory") as string,
    occurred_on: formData.get("transactionDate") as string,
  };
  
}
