import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const UpdateProfileDialog=({open,setOpen})=> {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-sm lg:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue="@peduarte"/>
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue="@peduarte" />
            </Field>
            <Field>
              <Label htmlFor="number">Number</Label>
              <Input id="number" name="number" defaultValue="@peduarte" />
            </Field>
            <Field>
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" name="bio" defaultValue="@peduarte" />
            </Field>
            <Field>
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" name="skills" defaultValue="@peduarte" />
            </Field>
            <Field>
              <Label htmlFor="file">Resume</Label>
              <Input id="file" name="file" defaultValue="@peduarte" accept="application/pdf" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
export default UpdateProfileDialog