import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Accepted, Pending, StatusBadge } from './ui/UpdatedBadge'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A List of Your Applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet</span> : allAppliedJobs.map((appliedJob) => {
              return (
                <TableRow key={appliedJob.id}>
                  <TableCell>{new Date(appliedJob.createdat).toLocaleDateString()}</TableCell>
                  <TableCell>{appliedJob.job.title}</TableCell>
                  <TableCell>{appliedJob.job.company.name}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={appliedJob?.status}/>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable