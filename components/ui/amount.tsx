export function FormattedAmount({
  amount,
  currency,
  colored = true,
}: {
  amount: bigint | number;
  currency: string;
  colored?: boolean;
}) {
  const value = Number(amount);
  const isNegative = value < 0;

  return (
    <span
      style={{
        color: colored
          ? isNegative
            ? "#EB3838"
            : "#78E82E"
          : undefined,
      }}
    >
      {isNegative ? "-" : ""}
      {currency}
      {(Math.abs(value) / 100).toFixed(2)}
    </span>
  );
}