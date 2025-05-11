import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRole: "",
  userDetails: {},
  stdClass: {},
  subjects: {},
  subjectClassWise: {},
  teachers: {},
  students:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    resetUser: (state) => {
      state.currentRole = "";
      state.userDetails = {};
      // state.stdClass = "";
      // state.subjects = "";
      // state.teachers = ""

    },
    setStdClass: (state, action) => {
      state.stdClass = action.payload;
    },

    setSubjectDetails: (state, action) => {
      state.subjects = action.payload;
    },

    setSubjectClassWise: (state, action) => {
      state.subjectClassWise = action.payload;
    },
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    setStudents:(state,action)=>{
      state.students=action.payload
    }

  },

});

export const { setCurrentRole, setUserDetails, resetUser, setStdClass, resetClass,
   setSubjectDetails, resetSubjects, setSubjectClassWise, setTeachers, resetTeacher,setStudents } = userSlice.actions;
export default userSlice.reducer;
