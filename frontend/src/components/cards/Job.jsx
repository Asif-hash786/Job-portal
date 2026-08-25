import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNowStrict } from "date-fns";
const Job = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-200 dark:border-gray-800
  hover:border-blue-500/50
  dark:hover:border-blue-400/40
  bg-white dark:bg-gray-900
  transition-all duration-200'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>
          <span className="font-normal text-gray-800">
          {job?.createdAt
            ? formatDistanceToNowStrict(new Date(job.createdAt), {
              addSuffix: true,
            })
            : "N/A"}
        </span></p>
        <Button variant='outline' className="rounded-full" size='icon'><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div> 
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded" variant='secondary'>{job?.position} Position</Badge>
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded" variant='secondary'>{job?.jobType}</Badge>
        <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 rounded" variant='secondary'>{job?.salary} Lpa</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline' onClick={() => navigate(`/description/${job?.id}`)} >Details</Button>
        <Button variant='outline' className="bg-first text-white dark:bg-first">Save for later</Button>
      </div>
    </div>
  )
}

export default Job