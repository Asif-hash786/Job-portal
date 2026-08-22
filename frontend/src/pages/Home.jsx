import React from 'react'
import HeroSection from '@/components/main/HeroSection'
import CategoryCrousel from '@/components/main/CategoryCrousel'
import LatestJob from '@/components/main/LatestJob'
import userGetAllJobs from '@/hooks/userGetAllJobs'
const Home = () => {
  userGetAllJobs();
  return (
    <div>
        <HeroSection />
        <CategoryCrousel />
        <LatestJob />
    </div>
  )
}

export default Home