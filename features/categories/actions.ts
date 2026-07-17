"use server";

import { getUserIfExists } from "@/lib/require-user";

export async function createCategory(formData: FormData) {
  const { user, supabase } = await getUserIfExists();

  const name = formData.get("createCategoryName") as string;
  const color = formData.get("createCategoryColor") as string;

  const { error: insertError } = await supabase.from("categories").insert({
    user_id: user.id,
    name: name,
    color: color,
  });

  if (insertError) {
    throw insertError;
  }
}
