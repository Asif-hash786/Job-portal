import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
  const navigate = useNavigate()
  const jobId = "djhQFDQW"
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-200'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>2 days ago</p>
        <Button variant='outline' className="rounded-full" size='icon'><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src="https://cdn.brandfetch.io/idchmboHEZ/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>Company Name</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, praesentium qui dolorem fugit illo dolores nesciunt nobis officiis quasi sapiente.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant='secondary'>12 Position</Badge>
        <Badge className="text-red-700 font-bold" variant='secondary'>Part Time</Badge>
        <Badge className="text-second font-bold" variant='secondary'>24 Lpa</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline'onClick={()=>navigate(`/description/${jobId}`)} >Details</Button>
        <Button variant='outline' className="bg-first text-white dark:bg-first">Save for later</Button>
      </div>
    </div>
  ) 
}

export default Job