import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJob from '@/hooks/useGetAllAdminJob'
import { setSearchJobByText } from '@/redux/jobSlice'
const AdminJob = () => {
  useGetAllAdminJob();
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSearchJobByText(input));
  },[input])
  return (
    <div className='max-w-6xl mx-auto my-10 px-4 md:px-6 lg:px-0'>
      <div className='flex items-center justify-between'>
        <Input className="w-fit" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)} />
        <Button onClick={()=>navigate("/admin/jobs/create")} className="cursor-pointer">New Jobs</Button>
      </div>
      <div className='my-5'>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJob