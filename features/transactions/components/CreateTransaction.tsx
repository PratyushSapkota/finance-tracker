import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAccounts } from "@/features/accounts/queries";
import { getBuckets } from "@/features/buckets/queries";
import { getCategories } from "@/features/categories/queries";
import { CategorySelect } from "./CategorySelect";
import { AccountSelect } from "./AccountSelect";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createTransaction } from "../actions";

export async function CreateTransaction() {
  const categories = await getCategories();
  const accounts = await getAccounts();
  const buckets = await getBuckets();

  return (
    <div className="border-2 border-red-900 w-fit p-9">
      <h1>Create Transaction</h1>
      <form action={createTransaction}>
        <RadioGroup defaultValue="expense" name="expense-or-income">
          <Field orientation={"horizontal"}>
            <RadioGroupItem value="expense" id="expense" />
            <FieldLabel htmlFor="expense">Expense</FieldLabel>
          </Field>
          <Field orientation={"horizontal"}>
            <RadioGroupItem value="income" id="income" />
            <FieldLabel htmlFor="income">Income</FieldLabel>
          </Field>
        </RadioGroup>
        <Field>
          <Label htmlFor="transaction-description">
            Transaction Description
          </Label>
          <Input id="transaction-description" name="transactionDescription" />
        </Field>
        <Field>
          <Label htmlFor="transaction-amount">Transaction Amount</Label>
          <Input
            id="transaction-amount"
            name="transactionAmount"
            type="number"
          />
        </Field>
        <Field>
          <Label htmlFor="transaction-category">Category</Label>
          <CategorySelect categories={categories} />
        </Field>
        <Field>
          <Label htmlFor="transaction-account">Account</Label>
          <AccountSelect accounts={accounts} buckets={buckets} />
        </Field>
        <Field>
          <Label htmlFor="transaction-date">Date</Label>
          <Input
            type={"date"}
            defaultValue={new Date().toISOString().split("T")[0]}
            name="transactionDate"
          />
        </Field>
        <CardFooter>
          <Button type="submit" className="bg-orange-700">Create</Button>
        </CardFooter>
      </form>
    </div>
  );
}

{
}
