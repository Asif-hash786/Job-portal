import { Avatar, AvatarImage } from '@/components/ui/avatar'
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
import { Edit2, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies ,searchCompanyByText} = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(()=>{
    const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText])
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-h-100  ">
        <Table>
          <TableCaption className="pb-4">
            A list of your recent registered companies.
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="">Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany?.map((company) => (
              <TableRow key={company.id}>

                {/* Logo */}
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>

                {/* Company Name */}
                <TableCell className="font-medium">
                  {company.name}
                </TableCell>

                {/* Date */}
                <TableCell>
                  {new Date(company.createdat).toLocaleDateString()}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <MoreHorizontal />
                      </Button>
                    </PopoverTrigger>
 
                    <PopoverContent className="w-28 p-2">
                      <Button
                        onClick={()=>navigate(`/admin/companies/${company.id}`)}
                        variant="ghost"
                        className="w-full justify-start cursor-pointer"
                      >
                        <Edit2 />
                        Edit
                      </Button>
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

export default CompaniesTable