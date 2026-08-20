import React, { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/services/api'
import { toast } from '@/components/ui/toast'
import { Spinner } from '@/components/ui/spinner'
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname)
    formData.append("email",input.email)
    formData.append("password",input.password)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("role",input.role)
    if(input.file){
       formData.append("file",input.file)
    }
    try {
      setLoading(true);
      const response = await registerUser(formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      if(response.data.success){
        toast.add({
          type: "success",
          title: response.data.message,
          description: "Signup successfully",
        })
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.add({
          type: "error",
          title: error.response?.data?.message || "Something went wrong", 
        })
    } finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/3 border border-gray-200 rounded-md p-4 my-4 shadow-xl'>
          <h1 className='text-center font-semibold'>Sign Up</h1>
          <div>
            <Label className="py-2">Full Name</Label>
            <Input type="text" placeholder='john' value={input.fullname} name="fullname" onChange={changeEventHandler} />
            <Label className="py-2">Email</Label>
            <Input type="email" placeholder='john@123@gmail.com' value={input.email} name="email" onChange={changeEventHandler} />
            <Label className="py-2">Password</Label>
            <Input type="password" placeholder='john@#123' value={input.password} name="password" onChange={changeEventHandler} />
            <Label className="py-2">Phone no</Label>
            <Input type="number" placeholder='91 876786316' value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} />
            <RadioGroup defaultValue="option-one" className="flex items-center gap-4 my-5" value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="student" id="option-one" />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="recruiter" id="option-two" />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <div>
                <Label>Profile</Label>
                <Label className="text-[10px] text-red-400">(optional)</Label>
              </div>
              <Input type="file" accept="image/*" className="cursor-pointer" onChange={changeFileHandler} />
            </div>
          </div>
          <Button type='submit' className="w-full my-4 hover:bg-black hover:text-white cursor-pointer " variant='outline' disabled={loading} >{loading?<Spinner/>:"Signup"}</Button>
          <span className='text-sm'>Already have an account? <Link to="/login" className='font-bold text-sm'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}
export default Signup