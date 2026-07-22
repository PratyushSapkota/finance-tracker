import { TableCell, TableRow } from "@/components/ui/table";
import { DetailedTransaction } from "../types";
import { formatAmount } from "@/utils/amount";

export function TransactionRow({
  transaction,
}: {
  transaction: DetailedTransaction;
}) {
  return (
    <TableRow key={transaction.id}>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>
        {formatAmount(
          transaction.amount,
          "",
        )}
      </TableCell>
      <TableCell>{transaction.accountWithBucket.name}</TableCell>
      <TableCell>{transaction.category.name}</TableCell>
    </TableRow>
  );
}
