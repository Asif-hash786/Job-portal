import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { updateStatus } from '@/services/api';
import { toast } from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';

const shortlisting = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [loading,setLoading] = useState(false);
  const statusHandler = async(status,id) =>{
    try {
      setLoading(true);
      const response = await updateStatus(id,{status});
      if(response.data.success){
        toast.add({
          type: "success",
          title: response.data.message, 
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
          type: "error",
          title: error.response.data.message,
        });
    } finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applications?.map((item) => (
              <tr key={item.id}>
                <TableCell>{item?.user?.fullname}</TableCell>
                <TableCell>{item?.user?.email}</TableCell>
                <TableCell>{item?.user?.phoneNumber}</TableCell>
                <TableCell>
                  {
                    item?.user?.profile?.resume ? <a className='text-blue-500' href={item?.user?.profile?.resume}>{item?.user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                  }
                </TableCell>
                <TableCell>{new Date(item?.user?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer ">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-28">
                      {
                        shortlisting.map((status, index) => {
                          return (
                            <div key={index}>
                              <Button onClick={()=>statusHandler(status,item?.id)} variant='ghost' className="cursor-pointer">{status}</Button>
                            </div>
                          )
                        })
                      }
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable