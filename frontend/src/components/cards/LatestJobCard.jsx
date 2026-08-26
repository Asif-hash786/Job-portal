import React from 'react';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl p-[1.5px] cursor-pointer"
      onClick={() => navigate(`/description/${job.id}`)}
    >
      <div
        className="
          absolute inset-[-150%]
          animate-[spin_4s_linear_infinite]
          bg-[conic-gradient(from_0deg,transparent_0deg,#07AAA5_45deg,transparent_90deg)]
        "
      />
      <div
        className="
          relative h-full w-full rounded-xl
          bg-white dark:bg-gray-950
          p-4 sm:p-5
          shadow-xl
          transition-all duration-300
          group-hover:shadow-2xl
        "
      >
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {job?.company?.name}
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            India
          </p>
        </div>
        <div className="mt-3">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {job?.title}
          </h1>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {job?.description}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            variant="ghost"
            className="
              rounded
              bg-blue-50 text-blue-700
              dark:bg-blue-950 dark:text-blue-300
            "
          >
            {job?.position} Position
          </Badge>

          <Badge
            variant="ghost"
            className="
              rounded
              bg-red-50 text-red-700
              dark:bg-red-950 dark:text-red-300
            "
          >
            {job?.jobType}
          </Badge>

          <Badge
            variant="ghost"
            className="
              rounded font-semibold
              bg-sky-50 text-sky-700
              dark:bg-sky-950 dark:text-sky-300
            "
          >
            {job?.salary} Lpa
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCard;