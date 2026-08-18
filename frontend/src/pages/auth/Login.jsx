import React, { useState } from 'react'
import Navbar from '@/components/common/Navbar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '@/services/api'
import { toast } from '@/components/ui/toast'
import { Spinner } from '@/components/ui/spinner'
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(input, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(loading){
        <Spinner/>
      }
      if (response.data.success) {
        toast.add({
          type: "success",
          title: response.data.message,
          description: "Login Successfully!",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.add({
          type: "error",
          title: "Login failed",
          description: error.response?.data?.message || "Something went wrong"
        });
    } finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto '>
        <form onSubmit={submitHandler} className='w-1/3 border border-gray-200 rounded-md p-4 my-10 shadow-xl'>
          <h1 className='text-center font-semibold'>Login</h1>
          <div>
            <Label className="py-2">Email</Label>
            <Input type="email" placeholder='john@123@gmail.com' value={input.email} onChange={changeEventHandler} name="email" />
            <Label className="py-2">Password</Label>
            <Input type="password" placeholder='john@#123' value={input.password} onChange={changeEventHandler} name="password" />
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
          </div>
          <Button type='submit' className="w-full my-4 hover:bg-black hover:text-white cursor-pointer " variant='outline' disabled={loading} >{loading ? <Spinner /> : "Login"}</Button>
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='font-bold text-sm'>Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login