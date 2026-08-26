import React from 'react';
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden rounded-xl p-[1.5px]">
      <div
        className="
          absolute
          inset-[-150%]
          animate-[spin_5s_linear_infinite]
          bg-[conic-gradient(from_0deg,transparent_0deg,#07AAA5_45deg,transparent_90deg)]
        "
      />
      <div
        className="
          relative
          h-full
          w-full
          rounded-xl
          bg-white
          dark:bg-gray-950
          p-4
          sm:p-5
          shadow-lg
          transition-all
          duration-300
          hover:shadow-xl
        "
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {job?.createdAt
              ? formatDistanceToNowStrict(new Date(job.createdAt), {
                  addSuffix: true,
                })
              : 'N/A'}
          </p>

          <Button
            variant="outline"
            size="icon"
            className="
              h-8 w-8
              sm:h-9 sm:w-9
              rounded-full
              shrink-0
            "
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        {/* Company */}
        <div className="flex items-center gap-3 my-4">

          <Avatar className="h-11 w-11 sm:h-12 sm:w-12 border">
            <AvatarImage src={job?.company?.logo} />

            <AvatarFallback>
              {job?.company?.name?.charAt(0)?.toUpperCase() || 'C'}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h1 className="font-semibold text-base sm:text-lg truncate">
              {job?.company?.name}
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {job?.location || 'India'}
            </p>
          </div>
        </div>

        {/* Job information */}
        <div>
          <h1 className="
            font-bold
            text-base
            sm:text-lg
            md:text-xl
            line-clamp-1
          ">
            {job?.title}
          </h1>

          <p className="
            mt-2
            text-xs
            sm:text-sm
            text-gray-600
            dark:text-gray-300
            line-clamp-3
            min-h-13.5
          ">
            {job?.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">

          <Badge
            variant="secondary"
            className="
              rounded
              text-xs
              bg-blue-50
              text-blue-700
              dark:bg-blue-950
              dark:text-blue-300
            "
          >
            {job?.position} Position
          </Badge>

          <Badge
            variant="secondary"
            className="
              rounded
              text-xs
              bg-red-50
              text-red-700
              dark:bg-red-950
              dark:text-red-300
            "
          >
            {job?.jobType}
          </Badge>

          <Badge
            variant="secondary"
            className="
              rounded
              text-xs
              bg-sky-50
              text-sky-700
              dark:bg-sky-950
              dark:text-sky-300
            "
          >
            {job?.salary} Lpa
          </Badge>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5">

          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate(`/description/${job?.id}`)}
          >
            Details
          </Button>

          <Button
            className="
              w-full
              sm:w-auto
              bg-[#07AAA5]
              hover:bg-[#078f8b]
              text-white
              dark:text-white
            "
          >
            Save for later
          </Button>

        </div>

      </div>
    </div>
  );
};

export default Job;