"use server";

import { getUserIfExists } from "@/lib/require-user";
import { Category } from "./types";

export async function getCategories() {
  const { supabase, user } = await getUserIfExists();

  const { data, error: queryError } = await supabase
    .from("categories")
    .select();

  if (queryError) {
    throw queryError;
  }

  return data as Category[];
}
