import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Contact, Download, Mail, Pen } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { FileText } from 'lucide-react'
import React, { useState } from 'react'
import AppliedJobTable from '@/components/AppliedJobTable'
import UpdateProfileDialog from '@/components/UpdateProfileDialog'
const skills = ["html", "css", "javaScript"]
const isResume = true
const Profile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className='max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
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
          <Button className="text-right" variant='outline' onClick={()=>setOpen(true)}><Pen /></Button>
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
          <Button variant='outline'>Skills</Button>
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
        <div className='gird w-full max-w-sm items-center gap-1.5 flex'>
          <div>
            {
              isResume ? <a target='blank' href='https://Youtube.com' className=' w-full'><Button variant='outline'> <FileText />Resume</Button></a> :
                <span>NA</span>
            }
          </div>
          <div>
            <Button variant='outline'><Download size={12} /></Button>
          </div>
        </div>
      </div>
      <div className='max-w-4xl mx-auto rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile