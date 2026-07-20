export function formatAmount(amount: bigint | number, currency: string) {
  return `${currency}${(Number(amount) / 100).toFixed(2)}`;
}
