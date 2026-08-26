import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ShinyText from '../ShinyText'
import { useTheme } from '../common/Theme-provider'
import BlurText from '../BlurText'
const HeroSection = () => {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      document.documentElement.classList.contains("dark"));
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className='text-center mt-4'>
      <div className='flex flex-col gap-5'>
        <span className='pt-2 mx-auto text-xl md:text-2xl tracking-widest'>
          <ShinyText
            text="Where Talent Meets Opportunity"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#07AAA5"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </span>
        <div className='text-4xl  md:text-6xl lg:text-8xl flex item-center justify-center font-bold mt-2 md:mt-6 gap-4 md:gap-6 dark:text-gray-300'>
          <BlurText
          text="Every Career"
          delay={200}
          animateBy="words"
          direction="top"
          className=""
        />
        <BlurText
          text="Starts"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-first"
        />
        </div>
        <div className='text-4xl md:text-6xl flex item-center justify-center mb-8 font-semibold gap-4 md:gap-6 dark:text-gray-300'>
          <BlurText
          text="With a"
          delay={200}
          animateBy="words"
          direction="top"
          className=""
        />
        <BlurText
          text="Search"
          delay={200}
          animateBy="words"
          direction="top"
          className="bg-first rounded px-2 py-1"
        />
        </div>
        <ShinyText
          text="Discover the right jobs, connect with leading companies, apply confidently, and build a successful career that matches your skills and ambitions."
          speed={2}
          delay={0}
          color="#b5b5b5"
          shineColor="#07AAA5"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
          className='px-4 '
        />
        <div className="flex items-center mx-auto w-full max-w-sm sm:max-w-sm md:max-w-2xl rounded-full border border-input bg-background shadow-sm transition-colors focus-within:ring-2 focus-within:ring-ring/30">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Job..."
            className="w-full min-w-0 bg-transparent px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />

          <Button
            size="icon"
            className="mr-1 h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full cursor-pointer"
            onClick={searchJobHandler}
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection