import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({

    name:"auth",
    initialState:{isLoggedIn:false},  //import {useSelector} from 'react-redux
    reducers:{
        login(state){
            state.isLoggedIn=true
        },
        logout(state){
            state.isLoggedIn=false
        }
    }
})
export const authActions=authSlice.actions; //authactions --> login and logout , import using dispatch
export default authSlice.reducer; // it import as authReducer(any name) in store.js
