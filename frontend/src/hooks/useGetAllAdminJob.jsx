import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAdminJob } from '@/services/api';
import { setAllAdminJob } from '@/redux/jobSlice';
const useGetAllAdminJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const response = await getAdminJob();
        if (response.data.success) {
          dispatch(setAllAdminJob(response.data.jobs))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAdminJobs();
  }, [])
}

export default useGetAllAdminJob