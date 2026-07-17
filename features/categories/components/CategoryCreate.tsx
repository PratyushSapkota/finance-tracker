import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategory } from "../actions";

export function CategoryCreate() {
  return (
    <form className="w-40 ml-2" action={createCategory} >
      <FieldGroup>
        <Field>
          <FieldLabel>Category Title</FieldLabel>
          <Input name="categoryTitle" />
        </Field>
      </FieldGroup>
      <Button className="mt-2">Create</Button>
    </form>
  );
}
