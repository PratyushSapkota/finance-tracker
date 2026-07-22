"use server";

import { getUserIfExists } from "@/lib/require-user";

function parseFormData(formData: FormData) {
  const expense_or_income = formData.get("expense-or-income") as string;
  const form_amount = formData.get("transactionAmount") as string;
  let amount;
  if (expense_or_income == "expense") {
    amount = Math.round(Number(form_amount) * -100);
  } else if (expense_or_income == "income") {
    amount = Math.round(Number(form_amount) * 100);
  } else {
    throw new Error("Invalid expense/income selection");
  }
  const date = formData.get("transactionDate") as string;
  const account_id = formData.get("transactionAccount") as string;
  const category_id = formData.get("transactionCategory") as string;
  const description = formData.get("transactionDescription") as string;

  return { amount, date, account_id, category_id, description };
}

export async function createTransaction(formData: FormData) {
  const { user, supabase } = await getUserIfExists();
  const { amount, date, account_id, category_id, description } =
    parseFormData(formData);
  const { error: rpcError } = await supabase.rpc("insert_transaction", {
    p_occurred_on: date,
    p_amount: amount,
    p_category_id: category_id,
    p_account_id: account_id,
    p_description: description,
  });

  if (rpcError) {
    throw rpcError;
  }
}
