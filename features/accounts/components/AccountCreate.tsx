import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccount } from "../actions";

export function AccountCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-50" variant={"default"}>Create Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new account</DialogTitle>
        </DialogHeader>

        <form action={createAccount}>
          <FieldGroup>
            <Field>
              <Label htmlFor="account-name">Account Name</Label>
              <Input id="account-name" name="accountName" />
            </Field>
            <Field>
              <Label htmlFor="account-color">Account Color</Label>
              <Input id="account-color" type="color" name="accountColor" />
            </Field>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"secondary"}>Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
