import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Contact, Download, Mail, Pen } from 'lucide-react'
import { FileText } from 'lucide-react'
import React, { useState } from 'react'
import AppliedJobTable from '@/components/AppliedJobTable'
import UpdateProfileDialog from '@/components/UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJob from '@/hooks/useGetAppliedJob'
const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  return (
    <div>
      <div className='max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">  
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl '>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button className="text-right" variant='outline' onClick={() => setOpen(true)}><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Button variant='outline'><Mail /></Button>
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Button variant='outline'><Contact /></Button>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <Button variant='outline'>Skills</Button>
          <div className='flex items-center gap-1 mt-2'>
            {
              user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => {
                return (
                  <Badge key={index}>{item}</Badge>
                )
              }) :
                <span>NA</span>
            }
          </div>
        </div>
        <div className='w-full max-w-sm items-center gap-1.5 flex'>
          <div>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="w-full"
              >
                <Button variant="outline">
                  <FileText />
                  {user?.profile?.resumeOriginalName || "View Resume"}
                </Button>
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
          <div>
            {user?.profile?.resume && (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button variant="outline">
                  <Download size={12} />
                </Button>
              </a>
          )}
          </div>
        </div>
      </div>
      <div className='max-w-4xl mx-auto rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile