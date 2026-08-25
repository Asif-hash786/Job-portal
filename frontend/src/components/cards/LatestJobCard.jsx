import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className=' p-3 md:p-4 rounded-md shadow-xl border border-gray-200 dark:border-gray-800
  hover:border-blue-500/50 dark:hover:border-blue-400/40 bg-white dark:bg-gray-900 transition-all duration-200 p-5">  Card content w-50 md:w-auto' onClick={()=>navigate(`/description/${job.id}`)}>
      <div>
        <h1 className='font-md text-md'>{job?.company?.name}</h1>
        <p className='text-xs md:text-md text-gray-500 dark:text-white'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-1'>{job?.title}</h1>
        <p className='text-sm text-gray-600 dark:text-white'>{job?.description}</p>
      </div>
      <div className='md:flex item-center md:gap-2 mt-4'>
        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded" variant='ghost'>{job?.position} Position</Badge>
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded mx-2" variant='ghost'>{job?.jobType}</Badge>
        <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 rounded font-bold my-2 md:my-0" variant='ghost'>{job?.salary} Lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard