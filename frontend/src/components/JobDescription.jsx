import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDesciption = () => {
  const isApllied = true;
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>Frontend Developer</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className="text-blue-700 font-bold" variant='secondary'>12 Position</Badge>
            <Badge className="text-red-700 font-bold" variant='secondary'>Part Time</Badge>
            <Badge className="text-second font-bold" variant='secondary'>24 Lpa</Badge>
          </div>
        </div>
        <Button disabled={isApllied} className={`rounded-lg ${isApllied ? 'bg-gray-600 cursor-not-allowed':"bg-first hover:bg-[#068888e5]"}`}>{isApllied ? "Already Applied" :"Apply Now"}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'> Job Description</h1>
      <div className='my-4'>
      <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
      <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
      <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
      <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
      <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
      <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
      <h1 className='font-bold my-1'>Posted Date : <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
      </div>
    </div>
  )
}

export default JobDesciption