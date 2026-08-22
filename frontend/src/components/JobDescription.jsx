import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { applyJob, jobById } from '@/services/api';
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
            {
              applicant: user?.id,
            },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));

        toast.add({
          type: "success",
          title: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        title: response?.data?.message
      });
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
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className="text-blue-700 font-bold" variant='secondary'>{singleJob?.position} Position</Badge>
            <Badge className="text-red-700 font-bold" variant='secondary'>{singleJob?.jobType}</Badge>
            <Badge className="text-second font-bold" variant='secondary'>{singleJob?.salary} Lpa</Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied || loading}
          className={`rounded-lg ${isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-first hover:bg-[#068888e5]"
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying...
            </>
          ) : isApplied ? (
            "Already Applied"
          ) : (
            "Apply Now"
          )}
        </Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'> Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
        <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
        <h1 className='font-bold my-1'>Posted Date : <span className='pl-4 font-normal text-gray-800'>{new Date(singleJob?.createdAt).toLocaleDateString()}</span></h1>
      </div>
    </div>
  )
}

export default JobDesciption
