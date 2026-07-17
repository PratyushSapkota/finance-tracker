import UserMenu from "@/components/UserMenu";
import { requireUser } from "@/lib/require-user";

export default async function Page() {
  const user = await requireUser();
  return (
    <>
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <UserMenu signedEmail={user.email} isSettings={true} />
      </div>
      <h1>Settings Page</h1>
    </>
  );
}
