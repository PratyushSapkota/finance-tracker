import { getTextColor } from "@/utils/text-color";
import { getCategories } from "../queries";

export async function CategoryList() {
  const categories = await getCategories();
  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          style={{
            background: category.color,
            color: getTextColor(category.color),
          }}
          className="p-2"
        >
          {category.name}
        </div>
      ))}
    </div>
  );
}
