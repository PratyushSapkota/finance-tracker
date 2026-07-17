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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAccounts } from "@/features/accounts/queries";
import { createSubAccount } from "../actions";

export async function SubAccountCreate() {
  const accounts = await getAccounts();

  const accountsDropdownItems = accounts.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create SubAccount</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create sub account</DialogTitle>
        </DialogHeader>

        <form action={createSubAccount}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="sub-account-name">
                Sub Account Name
              </FieldLabel>
              <Input id="sub-account-name" name="subAccountName" />
            </Field>
            <Field data-invalid>
              <Select name="accountId">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {accountsDropdownItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>Please select an account.</FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
