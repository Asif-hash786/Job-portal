import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
const category = [
  "Frontend Developer",
  "Data Scientist",
  "Flutter Developer",
  "Devops Enginner",
  "FullStack Ai Enginner"
]
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const CategoryCrousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className=''>
      <Carousel className="my-20 w-60 mx-25 md:w-xl lg:w-auto">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" key={index}>
                <Button onClick={()=>searchJobHandler(cat)} variant='outline' className="rounded-xl">{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCrousel