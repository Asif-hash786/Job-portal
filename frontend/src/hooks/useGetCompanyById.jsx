import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCompanyById } from '@/services/api';
import { setSingleCompany } from '@/redux/companySlice';
const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await getCompanyById(companyId);
        console.log("API RESPONSE:", response.data);
        if (response.data.success) {
          dispatch(setSingleCompany(response.data.company))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleCompany();
  }, [companyId, dispatch]);
}

export default useGetCompanyById