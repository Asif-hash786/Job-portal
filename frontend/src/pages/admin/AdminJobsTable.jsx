import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Edit2, Eye, EyeClosed, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterjobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredjobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredjobs);
  }, [allAdminJobs, searchJobByText])
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-h-100">
        <Table>
          <TableCaption className="pb-4">
            A list of your recent posted jobs
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="">Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              filterjobs?.map((job) => (
                <TableRow key={job.id}>
                  {/* Company Name */}
                  <TableCell className="font-medium">
                    {job?.company?.name}
                  </TableCell>

                  <TableCell className="font-medium">
                    {job?.title}
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger render={
                        <Button
                          variant="outline"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <MoreHorizontal />
                        </Button>
                      } />

                      <PopoverContent className="w-32 p-2">
                        <Button
                          onClick={() => navigate(`/admin/companies/${company.id}`)}
                          variant="ghost"
                          className="w-full justify-start cursor-pointer"
                        >
                          <Edit2 />
                          Edit
                        </Button>
                        <div className='flex items-center' onClick={() => navigate(`/admin/jobs/${job.id}/applicants`)}>
                          <Button variant='ghost' className="cursor-pointer">
                            <Eye />
                            <span>Applicants</span>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminJobsTable