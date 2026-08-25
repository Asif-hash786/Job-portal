import { setAllApplicants } from '@/redux/applicationSlice';
import { applicants } from '@/services/api'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useApplicants = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const response = await applicants(id);
        console.log(response.data);
        dispatch(setAllApplicants(response.data.job));
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  }, [dispatch,id])
}

export default useApplicants