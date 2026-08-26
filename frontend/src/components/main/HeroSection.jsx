import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ParticleText from '../ParticleText'
import StrokeText from '../StrokeText'
import ShinyText from '../ShinyText'
import { useTheme } from '../common/Theme-provider'
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
        <span className='pt-2 mx-auto text-2xl tracking-widest'>
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
        <div className=''>
          <StrokeText
            text="Search Smarter"
            strokeColor="#07AAA5"
            fillColor={isDark ? "#B5B5B5" : "#0A0A0A"}
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="Crisp out"
            trigger="mount"
            fillMode="wipe"
            fontSize={100}
            fontWeight={800}
            letterSpacing={-4}
            reverse={false}
          />
          <StrokeText
            text="Apply Faster"
            strokeColor="#07AAA5"
            fillColor={isDark ? "#B5B5B5" : "#0A0A0A"}
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={80}
            fontWeight={800}
            letterSpacing={-4}
            reverse={false}
          />
          <StrokeText
            text="Get Hired"
            strokeColor="#07AAA5"
            fillColor={isDark ? "#B5B5B5" : "#0A0A0A"}
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={70}
            fontWeight={800}
            letterSpacing={-4}
            reverse={false}
          />
        </div>
        <div>
          <ParticleText
            text="Build Your Career"
            particleSize={2.2}
            density={4}
            color="#143767"
            highlightColor="#05A7A5"
            scatter={220}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={42}
            repelRadius={120}
            idleDrift={0.8}
            trigger="mount"
            fontSize="clamp(3.5rem, 13vw, 9rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow
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
            className='px-4'
          />
        <div className="flex items-center mx-auto max-w-2xl rounded-full border border-input bg-background shadow-sm transition-colors focus-within:ring-2 focus-within:ring-ring/30">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Job..."
            className="w-full bg-transparent px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />

          <Button
            size="icon"
            className="mr-1 h-10 w-10 shrink-0 rounded-full"
            onClick={searchJobHandler}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection