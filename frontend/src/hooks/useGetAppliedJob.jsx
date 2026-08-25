import { setAllApplicants } from '@/redux/applicationSlice';
import { setAllAppliedJob } from '@/redux/jobSlice';
import { applicants, getAppliedJob } from '@/services/api'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        const response = await getAppliedJob();
        console.log(response.data);
        if (response.data.success) {
          dispatch(setAllAppliedJob(response.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppliedJob();
  }, [])
}

export default useGetAppliedJob