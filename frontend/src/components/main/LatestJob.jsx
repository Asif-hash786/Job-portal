import React from 'react'
import LatestJobCard from '../cards/LatestJobCard'
import { useSelector } from 'react-redux'

const LatestJob = () => {
  const { allJobs } = useSelector(store => store.job);
  return (
    <div className='max-w-7xl mx-auto my-20 px-4 md:px-block'>
      <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'> <span className='text-first'>Latest & Top </span>Job Openings</h1>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 my-5 cursor-pointer'>
        {
          allJobs.length <= 0 ? <span>No Job Available</span> : allJobs.map((job) => <LatestJobCard key={job.id} job={job} />)
        }
      </div>
    </div>
  )
}

export default LatestJob