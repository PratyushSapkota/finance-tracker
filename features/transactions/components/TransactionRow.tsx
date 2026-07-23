import { TableCell, TableRow } from "@/components/ui/table";
import { DetailedTransaction } from "../types";
import { formatAmount } from "@/utils/amount";
import { Badge } from "@/components/ui/badge";
import { getTextColor } from "@/utils/text-color";

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
        {formatAmount(
          transaction.amount,
          transaction.accountWithBucket.buckets.currency,
        )}
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
