"use server";

import { getUserIfExists } from "@/lib/require-user";

export async function createBucket(formData: FormData) {
  const { user, supabase } = await getUserIfExists();

  const name = formData.get("createBucketName") as string;
  const color = formData.get("createBucketColor") as string;
  const currency = formData.get("createBucketCurrency") as string;

  const {error: insertError} = await supabase.from("buckets").insert({
    user_id: user.id,
    name: name,
    color: color
  })

  if (insertError) {
    throw insertError
  }

  console.log("Bucket Created")

}
