import Book from "@/components/Book";
import { AccountCreate } from "@/features/accounts/components/AccountCreate";
import { Accounts } from "@/features/accounts/components/AccountList";
import { requireUser } from "@/lib/require-user";

async function Lectern() {
  return (
    <div className="lectern bg-white border-4 w-250 h-150 flex flex-col ">
      <Book />
      <Accounts />
    </div>
  );
}

export default Lectern;
