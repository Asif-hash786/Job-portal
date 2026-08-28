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
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "@/services/api"
import { toast } from "./ui/toast"
import { Spinner } from "./ui/spinner"
import { setUser } from "@/redux/authSlice"
const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    bio: user?.profile?.bio ?? "",
    skills: user?.profile?.skills ?? [],
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventhandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      file,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    formData.append(
      "skills",
      Array.isArray(input.skills)
        ? input.skills.join(",")
        : input.skills
    );

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      console.log("Calling API...");
      const response = await updateProfile(formData);

      if (response.data.success) {
        console.log(response.data)
        dispatch(setUser(response.data.User));
        toast.add({
          type: "success",
          title: response.data.message,
        });

        setOpen(false);
      }
    } catch (error) {

      toast.add({
        type: "error",
        title: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm lg:max-w-md">

        <form onSubmit={submitHandler}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>

            <Field>
              <Label htmlFor="fullname">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventhandler}
              />
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventhandler}
              />
            </Field>

            <Field>
              <Label htmlFor="phoneNumber">Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                value={input.phoneNumber}
                onChange={changeEventhandler}
              />
            </Field>

            <Field>
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventhandler}
              />
            </Field>

            <Field>
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={
                  Array.isArray(input.skills)
                    ? input.skills.join(", ")
                    : input.skills
                }
                onChange={changeEventhandler}
              />
            </Field>

            <Field>
              <Label htmlFor="file">Resume</Label>
              <Input
                id="file"
                name="file"
                accept="application/pdf"
                type="file"
                onChange={fileChangeHandler}
              />
            </Field>

          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose
              render={<Button variant="outline" type="button">Cancel</Button>}
            />

            <Button type="submit" disabled={loading}>
              {loading ? <span className="flex gap-2 items-center"><Spinner /> Uploading..</span> : "Save changes"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateProfileDialog