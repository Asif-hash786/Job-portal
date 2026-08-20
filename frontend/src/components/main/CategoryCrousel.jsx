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

const CategoryCrousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {
            category.map((cat, index) => (
                <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}>
                  <Button variant='outline' className="rounded-xl">{cat}</Button>
                </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCrousel