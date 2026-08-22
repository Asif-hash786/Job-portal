import Job from '@/components/cards/Job';
import FilterCard from '@/components/common/FilterCard'
import Navbar from '@/components/common/Navbar'
import React from 'react'
import { useSelector } from 'react-redux';

const Jobs = () => {
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div>
      <div className='max-w-7xl mx-auto mt-5 flex'>
        <div className='w-[18%]'>
          <FilterCard />
        </div>
        <div className='flex gap-5 px-2'>
          {
            allJobs.length <= 0 ? <div>jobs not found</div> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 lg:grid-cols-3  gap-4'>
                  {
                    allJobs.map((job)=>{
                      return(
                        <div>
                          <Job key={job?.id} job={job} />
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