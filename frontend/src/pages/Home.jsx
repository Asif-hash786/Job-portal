import React, { useEffect } from 'react'
import HeroSection from '@/components/main/HeroSection'
import CategoryCrousel from '@/components/main/CategoryCrousel'
import LatestJob from '@/components/main/LatestJob'
import userGetAllJobs from '@/hooks/userGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Accepted, Pending, Rejected } from '@/components/ui/UpdatedBadge'
const Home = () => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  },[]);
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