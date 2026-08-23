import React from 'react'
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar"
import { ModeToggle } from './Mode-toggel'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { Menu, LogOutIcon, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import jobImage from "../../assets/job.png"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from '../ui/toast'
import { logoutUser } from '@/services/api'
import { setUser } from '@/redux/authSlice'
const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await logoutUser()
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.add({
          type: "success",
          title: response?.data?.message
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        title: error.response?.data?.message
      });
    }
  }
  return (
    <div>
      <div className='flex justify-between items-center mx-auto max-w-7xl h-16 w-full px-4'>
        <div>
          <img src={jobImage} className='h-30 w-30  lg:h-40 lg:w-40' />
        </div>
        <div>
          <ul className='flex font-medium items-center gap-5'>
            <div className='hidden lg:flex items-cente  r gap-5'>
              {
                user && user.role === "recruiter" ? (
                  <>
                    <Link to="/admin/companies">Companies</Link>
                    <Link to="/admin/job">Jobs</Link>
                  </>
                ) : (
                  <>
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/browse">Browse</Link>
                  </>
                )
              }
            </div>
            <ModeToggle />
            {!user ? (
              <li className='flex gap-2'>
                <Link to="/login"><Button variant='outline' size='sm' className="cursor-pointer">Login</Button></Link>
                <Link to="/signup"><Button size='sm' className="cursor-pointer bg-first">SignUp</Button></Link>
              </li>
            ) : (
              <li className='cursor-pointer'>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Avatar>
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn"
                        ></AvatarImage>
                      </Avatar>
                    } />
                  <PopoverContent className="w-80">
                    <div className='flex gap-4 space-y-4'>
                      <Avatar>
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn"
                        ></AvatarImage>
                      </Avatar>
                      <div>
                        <PopoverTitle>{user?.fullname}</PopoverTitle>
                        <PopoverDescription className="text-sm text-muted-foreground">{user?.profile?.bio}</PopoverDescription>
                      </div>
                    </div>
                    <div className='px-12 flex gap-2'>
                      {
                        user && user.role === "student" && (
                          <Button size='sm' variant='outline'> <User2 /><Link to="/profile">View Profile</Link></Button>
                        )
                      }
                      <Button variant='destructive' size='sm' onClick={logoutHandler} > <LogOutIcon /> Logout</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
            )}
            <li className='sm:block lg:hidden' >
              <Popover>
                <PopoverTrigger render={<Menu />} />
                <PopoverContent align="bottom" className="w-40" side='right'>
                  <div className="flex flex-col gap-3">
                    <a href="/">Home</a>
                    <a href="/jobs">Jobs</a>
                    <a href="/browse">Browse</a>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar