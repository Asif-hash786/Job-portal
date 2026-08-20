import Job from '@/components/cards/Job';
import FilterCard from '@/components/common/FilterCard'
import Navbar from '@/components/common/Navbar'
import React from 'react'

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className='max-w-7xl mx-auto mt-5 flex'>
        <div className='w-[50%]'>
          <FilterCard />
        </div>
        <div className='flex gap-5'>
          {
            jobsArray.length <= 0 ? <div>jobs not found</div> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 lg:grid-cols-3  gap-4'>
                  {
                    jobsArray.map((item,index)=>{
                      return(
                        <div>
                          <Job/>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs