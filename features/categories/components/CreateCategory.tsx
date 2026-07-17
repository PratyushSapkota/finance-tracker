import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "../actions";

export function CreateCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new category.</DialogTitle>
          <DialogDescription>
            Create categories to label your transactions
          </DialogDescription>
        </DialogHeader>

        <form action={createCategory}>
          <FieldGroup>
            <Field>
              <Label htmlFor="create-category-name">Name</Label>
              <Input id="create-category-name" name="createCategoryName" />
            </Field>
            <Field>
              <Label htmlFor="create-category-color">Color</Label>
              <Input
                id="create-category-color"
                type="color"
                name="createCategoryColor"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
