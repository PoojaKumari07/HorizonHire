// import { setAllAppliedJobs } from "@/redux/jobSlice";
// import { APPLICATION_API_END_POINT } from "@/utils/constant";
// import axios from "axios"
// import { useEffect } from "react"
// import { useDispatch } from "react-redux"

// const useGetAppliedJobs = () => {
//     const dispatch = useDispatch();

//     useEffect(()=>{
//         const fetchAppliedJobs = async () => {
//             try {
//                 const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
//                 console.log(res.data);
//                 if(res.data.success){
//                     dispatch(setAllAppliedJobs(res.data.application));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAppliedJobs();
//     },[])
// };
// export default useGetAppliedJobs;

// useGetAppliedJobs.js
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        // Only fetch if user is authenticated and is a student
        if (!user || user.role !== 'student') return;
        
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials: true});
                console.log(res.data);
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchAppliedJobs();
    }, [user, dispatch])
};

export default useGetAppliedJobs;
