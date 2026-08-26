import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/services/api';
import { toast } from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('password', input.password);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('role', input.role);

    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);

      const response = await registerUser(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.add({
          type: 'success',
          title: response.data.message,
          description: 'Signup successfully',
        });

        navigate('/login');
      }
    } catch (error) {
      console.log(error);

      toast.add({
        type: 'error',
        title:
          error.response?.data?.message ||
          'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-6 sm:py-10">

      {/* Shining Border Wrapper */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl p-0.5">

        {/* Shining Border */}
        <div
          className="
            absolute
            inset-[-150%]
            animate-[spin_5s_linear_infinite]
            bg-[conic-gradient(from_0deg,transparent_0deg,#07AAA5_45deg,transparent_90deg)]
          "
        />

        {/* Signup Card */}
        <form
          onSubmit={submitHandler}
          className="
            relative
            w-full
            rounded-2xl
            bg-background
            border
            border-gray-200
            dark:border-gray-800
            p-5
            sm:p-7
            md:p-8
            shadow-xl
          "
        >

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Create Account
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Join us and find your next opportunity
            </p>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <Label
              htmlFor="fullname"
              className="mb-2 block"
            >
              Full Name
            </Label>

            <Input
              id="fullname"
              type="text"
              placeholder="John Doe"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="mb-2 block"
            >
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="john@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label
              htmlFor="password"
              className="mb-2 block"
            >
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Label
              htmlFor="phoneNumber"
              className="mb-2 block"
            >
              Phone Number
            </Label>

            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+91 9876543210"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              disabled={loading}
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <Label className="mb-3 block">
              Register as
            </Label>

            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput({
                  ...input,
                  role: value,
                })
              }
              className="flex flex-col sm:flex-row gap-3 sm:gap-6"
            >

              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="student"
                  id="student"
                  disabled={loading}
                />

                <Label
                  htmlFor="student"
                  className="cursor-pointer"
                >
                  Student
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                  disabled={loading}
                />

                <Label
                  htmlFor="recruiter"
                  className="cursor-pointer"
                >
                  Recruiter
                </Label>
              </div>

            </RadioGroup>
          </div>

          {/* Profile Image */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="profile">
                Profile Photo
              </Label>

              <span className="text-[10px] text-red-400">
                (optional)
              </span>
            </div>

            <Input
              id="profile"
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={changeFileHandler}
              disabled={loading}
            />

            {input.file && (
              <p className="text-xs text-muted-foreground mt-2 truncate">
                Selected: {input.file.name}
              </p>
            )}
          </div>

          {/* Signup Button */}
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          {/* Login */}
          <p className="text-sm text-center mt-5 text-muted-foreground">
            Already have an account?{' '}

            <Link
              to="/login"
              className="
                font-semibold
                text-[#07AAA5]
                hover:underline
              "
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;