import React from 'react'
import Navbar from '@/components/common/Navbar'
import HeroSection from '@/components/main/HeroSection'
import CategoryCrousel from '@/components/main/CategoryCrousel'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCrousel/>
    </div>
  )
}

export default Home