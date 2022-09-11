import { createSlice } from "@reduxjs/toolkit";

 const initialState={
    firstname:" ",
    lastname:" ",
    email:" ",
 }

export const userSlice=createSlice({
    name:"userInfo",
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.firstname=action.payload.firstname
            state.lastname=action.payload.lastname
            state.email=action.payload.email
        },
        removeUserInfo:(state,action)=>{
            state.firstname=action.payload.firstname
            state.lastname=action.payload.lastname
            state.email=action.payload.email
        },
    }

})

export const {setUserInfo,removeUserInfo}=userSlice.actions
export default userSlice.reducer;