// import React from 'react'

// const useGetAllGuestlecture = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default useGetAllGuestlecture

// useGetAllGuestlecture.js
import { setAllLectures } from '@/redux/guestlectureSlice'
import { GUEST_LECTURE_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllGuestlecture = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    useEffect(() => {
        // Only fetch if user is authenticated
        if (!user) return;
        
        const fetchAllLectures = async () => {
            try {
                const res = await axios.get(`${GUEST_LECTURE_API_END_POINT}/get`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setAllLectures(res.data.data));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchAllLectures();
    }, [user, dispatch])
}

export default useGetAllGuestlecture
