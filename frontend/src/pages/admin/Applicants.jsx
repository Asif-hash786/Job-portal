import React from 'react'
import ApplicantsTable from './ApplicantsTable'
import useApplicants from '@/hooks/useApplicants'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Applicants = () => {
  const { id } = useParams();
  useApplicants(id);
  const { applicants } = useSelector(store => store.application);
  return (
    <div className='max-w-7xl mx-auto px-6'>
      <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
      <div className='rounded-2xl border bg-card shadow-sm overflow-hidden my-6'>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants