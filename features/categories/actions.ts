"use server";

import { Unauthorized, userExists } from "@/lib/require-user";

export async function createCategory(formData: FormData) {
  const { error, supabase, user } = await userExists();

  if (error || !user) {
    throw new Unauthorized("");
  }

  const categoryTitle = formData.get("categoryTitle") as string;

  const { error: insertError } = await supabase.from("categories").insert({
    user_id: user.id,
    title: categoryTitle,
  });

  if (insertError) {
    throw insertError;
  }
}
