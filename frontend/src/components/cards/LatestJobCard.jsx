import React from 'react'
import { Badge } from '../ui/badge'

const LatestJobCard = ({job}) => {
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex item-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant='secondary'>{job?.position} Position</Badge>
        <Badge className="text-red-700 font-bold" variant='secondary'>{job?.jobType}</Badge>
        <Badge className="text-second font-bold" variant='secondary'>{job?.salary} Lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard