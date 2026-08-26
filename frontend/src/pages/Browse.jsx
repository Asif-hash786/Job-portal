import Job from '@/components/cards/Job'
import ShinyText from '@/components/ShinyText';
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
      <div className='max-w-7xl mx-auto my-10 px-6'>
        <div className='my-4'>
          <ShinyText
                  text={`Search Results (${allJobs.length})`}
                  speed={2}
                  delay={0}
                  color="#A5A5A6"
                  shineColor="#07AAA5"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                  className='text-sm md:text-xl'
                />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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