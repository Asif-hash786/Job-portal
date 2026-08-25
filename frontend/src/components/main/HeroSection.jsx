import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const HeroSection = () => {
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
        <span className=' text-primary dark:bg-first bg-gray-200 rounded-xl px-4 py-2 mx-auto'>Best job hunt website </span>
        <h1 className='text-5xl font-bold leading-14'>
          Search Smarter <br />Apply Faster <br /><span className='text-primary'>Get Hired</span>
        </h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus est beatae officia error libero suscipit soluta quam voluptatum fugit iste.</p>
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