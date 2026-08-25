import Job from '@/components/cards/Job';
import FilterCard from '@/components/common/FilterCard'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(()=>{
    if(searchedQuery){
      const filteredJobs = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
         job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
         job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs);
    } else{
      setFilterJobs(allJobs);
    }
  },[allJobs,searchedQuery])
  return (
    <div>
      <div className='max-w-7xl mx-auto mt-5 flex'>
        <div className='w-[18%]'>
          <FilterCard />
        </div>
        <div className='flex gap-5 px-2'>
          {
            filterJobs.length <= 0 ? <div>jobs not found</div> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 lg:grid-cols-3  gap-4'>
                  {
                    filterJobs.map((job) => {
                      return (
                        <div key={job?.id}>
                          <Job job={job} />
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