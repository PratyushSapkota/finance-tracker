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
    <Table className="w-fit">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Category</TableHead>
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
