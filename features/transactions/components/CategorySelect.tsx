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
import { useState } from "react";

export function CategorySelect({ categories }: { categories: Category[] }) {
  const items = categories.map((category) => ({
    id: category.id,
    label: category.name,
    color: category.color,
  }));

  const [selected, setSelected] = useState<(typeof items)[number] | null>(null);

  return (
    <>
      <input
        type="hidden"
        name="transactionCategory"
        value={selected?.id ?? ""}
      />
      <Combobox items={items} value={selected} onValueChange={setSelected}>
        <ComboboxInput id="transaction-category" />
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
    </>
  );
}
