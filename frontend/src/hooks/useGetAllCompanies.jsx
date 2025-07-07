// import { setCompanies} from '@/redux/companySlice'
// import { COMPANY_API_END_POINT} from '@/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// const useGetAllCompanies = () => {
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         const fetchCompanies = async () => {
//             try {
//                 const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
//                 console.log('called');
//                 if(res.data.success){
//                     dispatch(setCompanies(res.data.companies));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchCompanies();
//     },[]) 
// }

// export default useGetAllCompanies


// useGetAllCompanies.js
import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    useEffect(() => {
        // Only fetch if user is authenticated and is a recruiter
        if (!user || user.role !== 'recruiter') return;
        
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials: true});
                console.log('called');
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchCompanies();
    }, [user, dispatch])
}

export default useGetAllCompanies
