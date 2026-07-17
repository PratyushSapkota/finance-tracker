import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export class Unauthorized extends Error {
  constructor(message: string) {
    super(message);

    this.name = "Unauthorized";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

async function getUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error, supabase };
}

export async function requireUser() {
  const { user, error } = await getUser();
  if (error || !user) {
    redirect("/login");
  }
  return user;
}

export async function getUserIfExists() {
  const { user, error, supabase } = await getUser();
  if (error) {
    throw error;
  }

  if (!user) {
    throw new Unauthorized("");
  }

  return { user, supabase };
}
