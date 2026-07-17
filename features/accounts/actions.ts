"use server";
import { Unauthorized, userExists } from "@/lib/require-user";
import { revalidatePath } from "next/cache";

export async function deleteAccount(formData: FormData) {
  const accountId = formData.get("accountId") as string;

  const { error, supabase, user } = await userExists();

  if (error || !user) {
    throw new Unauthorized("");
  }

  const { error: deleteError } = await supabase
    .from("accounts")
    .delete()
    .eq("id", accountId)
    .eq("user_id", user.id);

  if (deleteError) {
    throw deleteError;
  }

  revalidatePath("/");
}

export async function updateAccount() {}

export async function createAccount(formData: FormData) {
  const accountName = formData.get("accountName") as string;
  const accountColor = formData.get("accountColor") as string;

  console.log(accountName, accountColor);

  const { error, supabase, user } = await userExists();

  if (error || !user) {
    throw new Unauthorized("");
  }

  const { error: insertError } = await supabase.from("accounts").insert({
    user_id: user.id,
    name: accountName,
    color: accountColor,
  });

  if (insertError) {
    throw insertError;
  }

  revalidatePath("/");
}
