"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";
import { Category } from "@/features/categories/types";
import { getTextColor } from "@/utils/text-color";

export function CategorySelect({ categories }: { categories: Category[] }) {
  const items = categories.map((category) => ({
    id: category.id,
    label: category.name,
    color: category.color,
  }));
  return (
    <Combobox items={items}>
      <ComboboxInput id="transaction-category" name="transactionCategory" />
      <ComboboxContent>
        <ComboboxEmpty>Please create a category from settings.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              style={{
                background: item.color,
                color: getTextColor(item.color),
              }}
              key={item.id}
              value={item}
            >
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
