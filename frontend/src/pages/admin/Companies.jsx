import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
const Companies = () => {
  useGetAllCompany();
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input));
  },[input])
  return (
    <div className='max-w-6xl mx-auto my-10 px-4 md:px-6 lg:px-0'>
      <div className='flex items-center justify-between'>
        <Input className="w-fit" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)} />
        <Button onClick={()=>navigate("/admin/companies/create")} className="cursor-pointer
              bg-[#07AAA5]
              hover:bg-[#078f8b]
              text-white
              dark:text-white"
              >New Company</Button>
      </div>
      <div className='rounded-2xl border bg-card shadow-sm overflow-hidden my-6'>
        <CompaniesTable/>
      </div>
    </div>
  )
} 

export default Companies