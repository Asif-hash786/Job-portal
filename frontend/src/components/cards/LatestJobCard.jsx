import React from 'react'
import { Badge } from '../ui/badge'

const LatestJobCard = () => {
  return (
    <div className='p-5 rounded-md shadow-xl border border-gray-100'>
      <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Job Title</h1>
        <p className='text-sm text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</p>
      </div>
      <div className='flex item-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant='secondary'>12 Position</Badge>
        <Badge className="text-red-700 font-bold" variant='secondary'>Part Time</Badge>
        <Badge className="text-second font-bold" variant='secondary'>24 Lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard