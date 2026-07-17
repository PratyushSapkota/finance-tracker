import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategories } from "@/features/categories/query";
import { getSubAccounts } from "@/features/subaccounts/queries";
import { transactionAdd } from "../actions";

export async function TransactionAdd() {
  const subaccounts = await getSubAccounts();
  const categories = await getCategories();
  return (
    <form action={transactionAdd}>
      <Label htmlFor="t-add-description">Description</Label>
      <Input id="t-add-description" type="text" name="description" />
      <Label htmlFor="t-add-amount">Amount</Label>
      <Input id="t-add-amount" type="number" name="amount" />
      <Label htmlFor="t-add-date">Date</Label>
      <Input id="t-add-date" type="date" name="date" />
      <Label htmlFor="t-add-category">Category</Label>
      <Combobox id="t-add-category" items={categories}>
        <ComboboxInput name="category" />
        <ComboboxContent>
          <ComboboxEmpty>Please create a category first.</ComboboxEmpty>
          <ComboboxList>
            {categories.map((category) => (
              <ComboboxItem key={category.id} value={category.id}>
                {category.title}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Label htmlFor="t-add-account">Sub-Account</Label>
      <Combobox id="t-add-account" items={subaccounts}>
        <ComboboxInput name="subaccount" />
        <ComboboxContent>
          <ComboboxEmpty>Please create a sub-account first.</ComboboxEmpty>
          <ComboboxList>
            {subaccounts.map((subaccount) => (
              <ComboboxItem key={subaccount.id} value={subaccount.id}>
                {subaccount.name}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Button type="submit">Add</Button>
    </form>
  );
}
