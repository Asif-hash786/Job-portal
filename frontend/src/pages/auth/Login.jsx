import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '@/services/api';
import { toast } from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';
import { setUser } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.add({
        type: 'error',
        title: 'Please fill all fields',
        description: 'Email, password and role are required.',
      });

      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(input, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        dispatch(setUser(response.data.User));

        toast.add({
          type: 'success',
          title: response.data.message,
          description: 'Login Successfully!',
        });

        navigate('/');
      }
    } catch (error) {
      console.log(error);

      toast.add({
        type: 'error',
        title: 'Login failed',
        description:
          error.response?.data?.message ||
          'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl p-0.5">

  {/* Shining border */}
  <div
    className="
      absolute
      inset-[-150%]
      animate-[spin_4s_linear_infinite]
      bg-[conic-gradient(from_0deg,transparent_0deg,#07AAA5_45deg,transparent_90deg)]
    "
  />

  {/* Login Card */}
  <form
    onSubmit={submitHandler}
    className="
      relative
      w-full
      rounded-2xl
      border
      border-gray-200
      dark:border-gray-800
      bg-background
      p-6
      sm:p-8
      shadow-xl
    "
  >

    {/* Header */}
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold">
        Login
      </h1>

      <p className="text-sm text-muted-foreground mt-1">
        Login to continue to your account
      </p>
    </div>

    {/* Email */}
    <div className="mb-4">
      <Label htmlFor="email" className="mb-2 block">
        Email
      </Label>

      <Input
        id="email"
        type="email"
        placeholder="john@gmail.com"
        value={input.email}
        onChange={changeEventHandler}
        name="email"
        disabled={loading}
      />
    </div>

    {/* Password */}
    <div className="mb-4">
      <Label htmlFor="password" className="mb-2 block">
        Password
      </Label>

      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={input.password}
        onChange={changeEventHandler}
        name="password"
        disabled={loading}
      />
    </div>

    {/* Role */}
    <div className="mb-5">
      <Label className="mb-3 block">
        Login as
      </Label>

      <RadioGroup
        value={input.role}
        onValueChange={(value) =>
          setInput({
            ...input,
            role: value,
          })
        }
        className="flex gap-6"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem
            value="student"
            id="student"
            disabled={loading}
          />
          <Label htmlFor="student" className="cursor-pointer">
            Student
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem
            value="recruiter"
            id="recruiter"
            disabled={loading}
          />
          <Label htmlFor="recruiter" className="cursor-pointer">
            Recruiter
          </Label>
        </div>
      </RadioGroup>
    </div>

    {/* Login */}
    <Button
      type="submit"
      disabled={loading}
      className="
        w-full
        bg-[#07AAA5]
        hover:bg-[#078f8b]
        text-white
        cursor-pointer
      "
    >
      {loading ? (
        <>
          <Spinner />
          Logging in...
        </>
      ) : (
        "Login"
      )}
    </Button>

    <p className="text-sm text-center mt-5 text-muted-foreground">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="font-semibold text-[#07AAA5] hover:underline"
      >
        Signup
      </Link>
    </p>

  </form>
</div>
    </div>
  );
};

export default Login;