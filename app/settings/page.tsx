import UserMenu from "@/components/UserMenu";
import { AccountsList } from "@/features/accounts/components/AccountsList";
import { CreateAccount } from "@/features/accounts/components/CreateAccount";
import { BucketsList } from "@/features/buckets/components/BucketsList";
import { CreateBucket } from "@/features/buckets/components/CreateBucket";
import { requireUser } from "@/lib/require-user";

export default async function Page() {
  const user = await requireUser();
  return (
    <main>
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <UserMenu signedEmail={user.email} isSettings={true} />
      </div>
      <div className="w-fit h-fit m-4 flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">Settings</h1>
        <div className="w-full flex flex-row gap-5">
          <div className="flex flex-col">
            <CreateBucket />
            <BucketsList />
          </div>
          <div className="flex flex-col">
            <CreateAccount />
            <AccountsList />
          </div>
        </div>
      </div>
    </main>
  );
}
