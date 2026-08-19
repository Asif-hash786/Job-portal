import Job from '@/components/cards/Job';
import FilterCard from '@/components/common/FilterCard'
import Navbar from '@/components/common/Navbar'
import React from 'react'

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <FilterCard />
        <div className='flex gap-5'>
          {
            jobsArray.map((item, index) => {
              return (
                <Job />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs