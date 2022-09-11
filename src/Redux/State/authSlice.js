import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:""
}

export const authSlice= createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        setUserToken:(state,action)=>{
            state.token=action.payload.token
        },
        removeUserToken:(state,action)=>{
            state.token=action.payload.token
        },
    }
})

export const {setUserToken,removeUserToken}=authSlice.actions;
export default authSlice.reducer;