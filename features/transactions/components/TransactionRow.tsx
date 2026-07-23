import { TableCell, TableRow } from "@/components/ui/table";
import { DetailedTransaction } from "../types";
import { Badge } from "@/components/ui/badge";
import { getTextColor } from "@/utils/text-color";
import { FormattedAmount } from "@/components/ui/amount";

export function TransactionRow({
  transaction,
}: {
  transaction: DetailedTransaction;
}) {
  return (
    <TableRow>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>
        <FormattedAmount
          amount={transaction.amount}
          currency={transaction.accountWithBucket.buckets.currency}
        />
      </TableCell>
      <TableCell>
        <ColoredBadge
          label={transaction.accountWithBucket.name}
          color={transaction.accountWithBucket.buckets.color}
        />
      </TableCell>
      <TableCell>
        <ColoredBadge
          label={transaction.category.name}
          color={transaction.category.color}
        />
      </TableCell>
    </TableRow>
  );
}

function ColoredBadge({ label, color }: { label: string; color: string }) {
  return (
    <Badge style={{ background: color, color: getTextColor(color) }}>
      {label}
    </Badge>
  );
}
