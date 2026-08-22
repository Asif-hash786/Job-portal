import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const filterData = [
  {
    filterType:"Location",
    array:["Delhi NCR","Banglore","Hyderabad","Noida","Mumbai","Pune"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","Ai Enginner"]
  },
  {
    filterType:"Salary",
    array:["0-40k","42-100k","100k-200k"]
  }
]

const FilterCard = () => {
  return (
    <div className='w-auto p-3 rounded-md'>
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((item,index)=>{
            return(
              <div>
                <h1 className='font-bold text-lg mt-2'>{item.filterType}</h1>
                {
                  item.array.map((data,index)=>{
                    return(
                      <div className='flex items-center space-x-2 my-2'>
                        <RadioGroupItem value={data}/>
                        <Label>{data}</Label>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard