import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBuckets } from "@/features/buckets/queries";

export async function CreateAccount() {
  const buckets = await getBuckets();
  const bucketsDropdownItems = buckets.map((bucket) => ({
    label: bucket.name,
    value: bucket.id,
  }));
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Account</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Account</DialogTitle>
          <DialogDescription>Accounts belong to buckets</DialogDescription>
        </DialogHeader>

        <form>
          <FieldGroup>
            <Field>
              <Label htmlFor="create-account-name">Name</Label>
              <Input id="create-account-name" name="createAccountName" />
            </Field>
            <Field>
              <Label htmlFor="create-account-bucket">Bucket</Label>
              <Select name="createAccountBucket">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bucketsDropdownItems.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
