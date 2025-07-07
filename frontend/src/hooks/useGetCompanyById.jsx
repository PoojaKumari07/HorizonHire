// import { setSingleCompany } from '@/redux/companySlice'
// import { setAllJobs } from '@/redux/jobSlice'
// import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// const useGetCompanyById = (companyId) => {
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         const fetchSingleCompany = async () => {
//             try {
//                 const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
//                 console.log(res.data.company);
//                 if(res.data.success){
//                     dispatch(setSingleCompany(res.data.company));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleCompany();
//     },[companyId, dispatch])
// }

// export default useGetCompanyById

// useGetCompanyById.js
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    useEffect(() => {
        // Only fetch if user is authenticated and companyId exists
        if (!user || !companyId) return;
        
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials: true});
                console.log(res.data.company);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchSingleCompany();
    }, [companyId, user, dispatch])
}

export default useGetCompanyById