import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { updateCompany } from '@/services/api'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CompanySetup = () => {
  const { id } = useParams();
  useGetCompanyById(id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      setLoading(true);
      const response = await updateCompany(formData, id);
      if (response.data.success) {
        toast.add({
          type: "success",
          title: response.data.message,
        });
      }
      navigate("/admin/companies");
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

  useEffect(() => {
      if (!singleCompany) return;
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || ""
    })
  }, [singleCompany]);

  return (
    <div className='max-w-xl mx-auto my-4 px-4 md:px-0'>
      <form onSubmit={submitHandler}>
        <div className='flex item-center gap-5 p-2'>
          <Button onClick={() => navigate("/admin/companies")} variant='outline' className="cursor-pointer"><ArrowLeft /><span>Back</span></Button>
          <h1 className='font-bold text-xl'>Company Setup</h1>
        </div>
        <div className='border shadow-xl px-4 py-2 rounded'>
          <div className='py-3'>
            <Label className="py-2">Company Name</Label>
            <Input type="text" name="name" onChange={changeEventHandler} value={input.name} />
          </div>
          <div className='pb-3'>
            <Label className="py-2">Description</Label>
            <Input type="text" name="description" onChange={changeEventHandler} value={input.description} />
          </div>
          <div className='pb-3'>
            <Label className="py-2">Website</Label>
            <Input type="text" name="website" onChange={changeEventHandler} value={input.website} />
          </div>
          <div className='pb-3'>
            <Label className="py-2">Location</Label>
            <Input type="text" name="location" onChange={changeEventHandler} value={input.location} />
          </div>
          <div className='pb-4'>
            <Label className="py-2">Logo</Label>
            <Input type="file" name="logo" accept="image/*" onChange={changeFileHandler} />
          </div>
          <Button variant='outline' className="cursor-pointer flex justify-center bg-first w-full my-2" type="submit">
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CompanySetup