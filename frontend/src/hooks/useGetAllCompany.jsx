import { setCompanies } from '@/redux/companySlice';
import { getAllCompany } from '@/services/api';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompany = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const response = await getAllCompany();
        if (response.data.success) {
          dispatch(setCompanies(response.data.companies))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllCompany();
  }, []);
}

export default useGetAllCompany