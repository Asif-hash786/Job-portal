import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import React from 'react'

const Profile = () => {
  const skills = ["html", "css", "javaScript"]
  return (
    <div>
      <div className='max-w-7xl mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://cdn.brandfetch.io/idchmboHEZ/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl '>Full Name</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ut a quas?</p>
            </div>
          </div>
          <Button className="text-right" variant='outline'><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Button variant='outline'><Mail /></Button>
            <span>asif12@gmail.com</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Button variant='outline'><Contact /></Button>
            <span>123456789</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1 mt-2'>
            {
              skills.length != 0 ? skills.map((item, index) => {
                return (
                  <Badge key={index}>{item}</Badge>
                )
              }) :
                <span>NA</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile