import { setAllJobs } from '@/redux/jobSlice';
import { allJobs } from '@/services/api'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const userGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await allJobs();
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllJobs();
  }, [])
}

export default userGetAllJobs