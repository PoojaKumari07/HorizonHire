// import { createSlice } from "@reduxjs/toolkit";

// const guestlectureSlice = createSlice({
//     name:'guestlecture',
//     initialState:{
//         lecture:null,
//     },
//     reducers:{
//         setAllLectures: (state, action) => {
//             state.lectures = action.payload;
//         },
//         setLecture:(state,action) => {
//             state.lecture = action.payload;
//         }
//     }
// });
// export const {setLecture, setAllLectures} = guestlectureSlice.actions;
// export default guestlectureSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const guestlectureSlice = createSlice({
    name: 'guestlecture',
    initialState: {
        lecture: null,      // For single lecture
        lectures: [],       // For multiple lectures array
    },
    reducers: {
        setAllLectures: (state, action) => {
            state.lectures = action.payload;
        },
        setLecture: (state, action) => {
            state.lecture = action.payload;
        }
    }
});

export const { setLecture, setAllLectures } = guestlectureSlice.actions;
export default guestlectureSlice.reducer;