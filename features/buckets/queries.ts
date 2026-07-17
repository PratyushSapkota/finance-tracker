"use server";

import { getUserIfExists } from "@/lib/require-user";
import { Bucket } from "./types";

export async function getBuckets() {
  const { supabase, user } = await getUserIfExists();

  const {data, error: queryError} = await supabase.from("buckets").select()

  if (queryError) {
    throw queryError
  }

  return data as Bucket[]
}
