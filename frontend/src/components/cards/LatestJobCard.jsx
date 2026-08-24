import React from 'react'
import { Badge } from '../ui/badge'

const LatestJobCard = ({job}) => {
  return (
    <div className='p-2 md:p-4 rounded-md shadow-xl border border-gray-100 w-50 md:w-auto'>
      <div>
        <h1 className='font-md text-md'>{job?.company?.name}</h1>
        <p className='text-xs md:text-md text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-1'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='md:flex item-center md:gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant='secondary'>{job?.position} Position</Badge>
        <Badge className="text-red-700 font-bold mx-2 md:mx-0" variant='secondary'>{job?.jobType}</Badge>
        <Badge className="text-second font-bold my-2 md:my-0" variant='secondary'>{job?.salary} Lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard