import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTransactions } from "../queries";
import { TransactionRow } from "./TransactionRow";

export async function TransactionList() {
  const transactions = await getTransactions();
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Date</TableHead>
          <TableHead className="whitespace-nowrap">Description</TableHead>
          <TableHead className="whitespace-nowrap">Amount</TableHead>
          <TableHead className="whitespace-nowrap">Account</TableHead>
          <TableHead className="whitespace-nowrap">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  );
}
