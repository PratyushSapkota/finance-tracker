"use server";

import { getAllTransactions } from "../queries";

export async function TransactionList() {
  const transactions = await getAllTransactions();
  return (
    <div>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          {transaction.description} {transaction.amount}
        </div>
      ))}
    </div>
  );
}
