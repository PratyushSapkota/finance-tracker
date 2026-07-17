"use server";

import { Unauthorized, userExists } from "@/lib/require-user";

export async function getCategories() {
  const { error, supabase, user } = await userExists();

  if (error || !user) {
    throw new Unauthorized("");
  }

  const { data, error: queryError } = await supabase
    .from("categories")
    .select();

  if (queryError) {
    throw queryError;
  }

  return data;
}
