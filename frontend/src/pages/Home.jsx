import React from 'react'
import Navbar from '@/components/common/Navbar'
import HeroSection from '@/components/main/HeroSection'
import CategoryCrousel from '@/components/main/CategoryCrousel'
import LatestJob from '@/components/main/LatestJob'
import Footer from '@/components/common/Footer'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCrousel/>
      <LatestJob/>
      <Footer/>
    </div>
  )
}

export default Home