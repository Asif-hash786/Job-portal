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
    <div className='sticky top-0 bg-white/40 backdrop-blur-sm dark:bg-black/50 z-1'>
      <div className='flex justify-between items-center mx-auto max-w-7xl h-16 w-full px-4'>
        <div>
          <img src={jobImage} onClick={() => navigate("/")} className='h-30 w-30  lg:h-40 lg:w-40 cursor-pointer' />
        </div>
        <div>
          <ul className='flex font-medium items-center gap-5'>
            <div className='hidden lg:flex items-cente  r gap-5'>
              {
                user && (
                user && user.role === "recruiter" ? (
                  <>
                    <Button variant='outline'><Link to="/admin/companies">Companies</Link></Button>
                    <Button variant='outline'><Link to="/admin/jobs">Jobs</Link></Button>
                  </>
                ) : (
                  <>
                    <Button variant='outline' className="cursor-pointer"><Link to="/">Home</Link></Button>
                    <Button variant='outline' className="cursor-pointer"><Link to="/jobs">Jobs</Link></Button>
                    <Button variant='outline' className="cursor-pointer"><Link to="/browse">Browse</Link></Button>
                  </>
                )
                )
              }
            </div>
            <ModeToggle />
            {!user ? (
              <li className='flex gap-2'>
                <Link to="/login"><Button size='sm' className="cursor-pointer bg-first">Login</Button></Link>
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
                        {
                          user && user.role === "student" ? (
                            <PopoverDescription className="text-sm text-muted-foreground">{user?.profile?.bio}</PopoverDescription>
                          ) : (
                            <PopoverDescription className="text-sm text-muted-foreground">Find your Best candidate through our this website</PopoverDescription>
                          )
                        }
                      </div>
                    </div>
                    <div className='px-12 flex gap-2'>
                      {
                        user && user.role === "student" && (
                          <Button size='sm' variant='outline'> <User2 /><Link to="/profile">View Profile</Link></Button>
                        )
                      }
                      <Button variant='destructive' size='sm' onClick={logoutHandler} className="cursor-pointer" > <LogOutIcon /> Logout</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
            )}
            <li className="block lg:hidden">
              <Popover>
  {user && (
    <>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" side="bottom" className="w-48">
        <div className="flex flex-col gap-2">
          {user?.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" className="rounded-md px-3 py-2 hover:bg-muted">
                Companies
              </Link>
              <Link to="/admin/jobs" className="rounded-md px-3 py-2 hover:bg-muted">
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="rounded-md px-3 py-2 hover:bg-muted">
                Home
              </Link>
              <Link to="/jobs" className="rounded-md px-3 py-2 hover:bg-muted">
                Jobs
              </Link>
              <Link to="/browse" className="rounded-md px-3 py-2 hover:bg-muted">
                Browse
              </Link>
            </>
          )}
        </div>
      </PopoverContent>
    </>
  )}
</Popover>
</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar