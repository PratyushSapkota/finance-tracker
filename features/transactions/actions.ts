"use server";

import { Unauthorized, userExists } from "@/lib/require-user";
import { revalidatePath } from "next/cache";

export async function transactionAdd(formData: FormData) {
  const { error, supabase, user } = await userExists();

  if (error || !user) {
    throw new Unauthorized("");
  }

  const description = formData.get("description") as string;
  const amount = formData.get("amount") as unknown as number;
  const date = formData.get("date") as string;
  const subaccount = formData.get("subaccount") as string;
  const category = formData.get("category") as string;

  const { error: rpcError, success } = await supabase.rpc(
    "insert_transaction",
    {
      p_amount: amount,
      p_description: description.trim(),
      p_subaccount_id: subaccount,
      p_date: date,
      p_category_id: category,
    },
  );

  if (rpcError) {
    throw rpcError;
  }

  console.log("HIT");

  revalidatePath("/");
}

export async function transactionTransfer(formData: FormData) {}
