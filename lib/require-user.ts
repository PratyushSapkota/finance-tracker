import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export class Unauthorized extends Error {
  constructor(message: string) {
    super(message);

    this.name = "Unauthorized";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export async function userExists() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error, supabase };
}

export async function requireUser() {
  const { user, error } = await userExists();
  if (error || !user) {
    redirect("/login");
  }
  return user;
}
