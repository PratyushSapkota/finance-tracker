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
import { createBucket } from "../actions";

export function CreateBucket() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Bucket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new bucket.</DialogTitle>
          <DialogDescription>
            Buckets are your money source. Eg: Chase Bank account, Cash, Paypal,
            etc...
          </DialogDescription>
        </DialogHeader>

        <form action={createBucket}>
          <FieldGroup>
            <Field>
              <Label htmlFor="create-bucket-name">Name</Label>
              <Input id="create-bucket-name" name="createBucketName" />
            </Field>
            <Field>
              <Label htmlFor="create-bucket-color">Color</Label>
              <Input
                id="create-bucket-color"
                type="color"
                name="createBucketColor"
              />
            </Field>
            <Field>
              <Label htmlFor="create-bucket-currency">Currency Label</Label>
              <Input
                id="create-bucket-currency"
                type="text"
                name="createBucketCurrency"
                // defaultValue={"$"}
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
