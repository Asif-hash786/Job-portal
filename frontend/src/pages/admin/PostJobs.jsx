import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { registerJob } from '@/services/api'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const PostJobs = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: [],
    experienceLevel: "",
    salary: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: ""
  });
  const { companies } = useSelector(store => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany.id });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...input,
      experienceLevel: Number(input.experienceLevel),
      salary: Number(input.salary),
      position: Number(input.position),
    };
    try {
      setLoading(true);
      const response = await registerJob(formattedData);
      if (response.data.success) {
        toast.add({
          type: "success",
          title: response.data.message,
          description: "Job Posted Successfully",
        });
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        title: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center mt-4 px-4 sm:px-6 mb-5'>
      <form onSubmit={submitHandler} className='w-full max-w-2xl'>
        <h1 className='text-lg sm:text-xl py-4 font-semibold text-center sm:text-left'>Create a New Job</h1>
        <div className='grid grid-cols-1 border shadow-xl px-4 sm:px-6 py-4 rounded'>
          <div className='py-2'>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              className="mt-2"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              className="my-2"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                className="mt-2"
                value={input.requirements.join(", ")}
                onChange={(e) => {
                  const value = e.target.value;
                  setInput({
                    ...input,
                    requirements: value.split(",").map((item) => item.trim()),
                  });
                }}
              />
            </div>
            <div>
              <Label>ExperienceLevel</Label>
              <Input
                type="number"
                name="experienceLevel"
                className="mt-2"
                value={input.experienceLevel}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                className="mt-2"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                className="mt-2"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                className="mt-2"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                className="mt-2"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          {
            companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="mt-4 w-full">
                  <SelectValue placeholder={"Select a company"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      companies.map((company) => {
                        return (
                          <SelectItem key={company.id} value={company?.name?.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        )
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            )
          }
          <Button
            className="my-4 w-full sm:w-auto cursor-pointer
              bg-[#07AAA5]
              hover:bg-[#078f8b]
              text-white
              dark:text-black"
            type="submit"
          >
            {loading ? <Spinner /> : "Post new Job"}
          </Button>
          {
            companies.length === 0 && <p className='text-xs text-red-500 font-semibold text-center my-2'>*Please register a company first before posting a jobs*</p>
          }
        </div>
      </form>
    </div>
  )
}

export default PostJobs