import { setAllJobs, setSearchedQuery } from '@/redux/jobSlice';
import { allJobs } from '@/services/api'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const userGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await allJobs(searchedQuery);
        console.log(response.data);
        dispatch(setAllJobs(response.data.jobs))
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllJobs();
  }, [])
}

export default userGetAllJobs