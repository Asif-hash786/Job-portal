import Job from '@/components/cards/Job'
import userGetAllJobs from '@/hooks/userGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Browse = () => {
  userGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [])
  return (
    <div>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            allJobs.map((job) => {
              return (
                <Job job={job} key={job.id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Browse