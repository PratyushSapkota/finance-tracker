"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox";
import { Account } from "@/features/accounts/types";
import { Bucket } from "@/features/buckets/types";

type AccountItem = {
  id: string;
  label: string;
  value: string;
};

type AccountGroup = {
  id: string;
  label: string;
  items: AccountItem[];
};

export function AccountSelect({
  accounts,
  buckets,
}: {
  accounts: Account[];
  buckets: Bucket[];
}) {
  const items: AccountGroup[] = buckets
    .map((bucket) => ({
      id: bucket.id,
      label: bucket.name,
      items: accounts
        .filter((account) => account.bucket_id === bucket.id)
        .map((account) => ({
          id: account.id,
          label: account.name,
          value: account.id,
        })),
    }))
    .filter((bucket) => bucket.items.length > 0);

  return (
    <Combobox items={items}>
      <ComboboxInput id="transaction-account" name="transactionAccount" />
      <ComboboxContent>
        <ComboboxEmpty>Please create an account from settings.</ComboboxEmpty>
        <ComboboxList>
          {(group: AccountGroup) => (
            <ComboboxGroup key={group.id} items={group.items}>
              <ComboboxLabel>{group.label}</ComboboxLabel>
              <ComboboxCollection>
                {(item: AccountItem) => (
                  <ComboboxItem key={item.id} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
