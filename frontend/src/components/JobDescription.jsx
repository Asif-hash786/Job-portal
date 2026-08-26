import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { applyJob, jobById } from '@/services/api';
import { Spinner } from './ui/spinner';
import { Toast } from './ui/toast'; // adjust to whatever toast lib you're using
import { Briefcase, MapPin, IndianRupee, Users, CalendarDays } from 'lucide-react';

const JobDesciption = () => {
  const params = useParams();
  const id = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const applyJobHandler = async () => {
    try {
      setLoading(true)
      const response = await applyJob(id);
      if (response.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?.id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));

        Toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await jobById(id);
        if (response.data.success) {
          const job = response.data.job;
          dispatch(setSingleJob(job));

          const alreadyApplied = job.applications?.some(
            (application) => application.applicant === user?.id
          );
          setIsApplied(alreadyApplied || false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      fetchSingleJob();
    }
  }, [id, dispatch, user?.id])

  const details = [
    { label: "Role", value: singleJob?.title, icon: Briefcase },
    { label: "Location", value: singleJob?.location, icon: MapPin },
    { label: "Experience", value: singleJob?.experienceLevel, icon: Briefcase },
    { label: "Salary", value: singleJob?.salary ? `${singleJob.salary} LPA` : undefined, icon: IndianRupee },
    { label: "Applicants", value: singleJob?.applications?.length ?? 0, icon: Users },
    {
      label: "Posted",
      value: singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : undefined,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-6 sm:my-10 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-5 sm:p-6 bg-card">
        <div className="min-w-0">
          <h1 className="font-bold text-xl sm:text-2xl truncate">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge
              variant="ghost"
              className="
                          rounded
                          bg-blue-50 text-blue-700
                          dark:bg-blue-950 dark:text-blue-300
                        "
            >{singleJob?.position} Position{singleJob?.position > 1 ? "s" : ""}</Badge>
            <Badge
              variant="ghost"
              className="
                          rounded
                          bg-red-50 text-red-700
                          dark:bg-red-950 dark:text-red-300
                        "
            >{singleJob?.jobType}</Badge>
            <Badge
              variant="ghost"
              className="
                          rounded
                          bg-sky-50 text-sky-700
                          dark:bg-sky-950 dark:text-sky-300
                        "
            >{singleJob?.salary} LPA</Badge>
          </div>
        </div>

        <Button
          onClick={applyJobHandler}
          disabled={isApplied || loading}
          className={`w-full sm:w-auto rounded-lg shrink-0 cursor-pointer ${isApplied
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-first hover:bg-[#068888e5]"
            }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Applying...
            </span>
          ) : isApplied ? (
            "Already Applied"
          ) : (
            "Apply Now"
          )}
        </Button>
      </div>

      {/* Description */}
      <div className="mt-6 border rounded-xl p-5 sm:p-6 bg-card">
        <h2 className="font-semibold text-lg border-b border-b-first pb-3 mb-4">
          Job Description
        </h2>

        <p className="text-foreground leading-relaxed whitespace-pre-line mb-6">
          {singleJob?.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {details.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-lg border p-3 bg-muted/30"
            >
              <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-sm font-medium text-foreground  wrap-break-words">
                  {value || "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobDesciption