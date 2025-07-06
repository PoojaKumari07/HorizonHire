import { createSlice } from "@reduxjs/toolkit";

const guestlectureSlice = createSlice({
    name:'guestlecture',
    initialState:{
        lecture:null,
    },
    reducers:{
        setLecture:(state,action) => {
            state.lecture = action.payload;
        }
    }
});
export const {setLecture} = guestlectureSlice.actions;
export default guestlectureSlice.reducer;