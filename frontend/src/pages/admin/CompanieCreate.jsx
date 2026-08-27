import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/toast'
import { setSingleCompany } from '@/redux/companySlice'
import { registerNewCompany } from '@/services/api'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompanieCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerCompany = async () => {
    try {
      const response = await registerNewCompany({ companyName });
      console.log(response.data);
      if (response?.data?.success) {
        dispatch(setSingleCompany(response.data.company));
        toast.add({
          type: "success",
          title: response.data.message,
        });
        const companyId = response?.data?.company?.id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        title: error.response.data.message,
      });
    }
  }
  return (
    <div className='max-w-4xl mx-auto px-6 md:px-0'>
      <div className='my-10'>
        <h1 className='font-bold text-2xl'>Your Company Name</h1>
        <p className='text-gray-500'>what would you like to give your company name</p>
      </div>
      <div className='my-4'>
        <Label>Company Name</Label>
        <Input type="text" className="my-4" placeholder="jobHunt, Microsoft etc.."
          onChange={(e) => setCompanyName(e.target.value)} ></Input>
        <div className='flex gap-2'>
          <Button variant='outline' className="cursor-pointer" onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button variant='outline' className="cursor-pointer
              bg-[#07AAA5]
              hover:bg-[#078f8b]
              text-white
              dark:text-white dark:bg-[#07AAA5] dark:hover:bg-[#078f8b]"onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanieCreate