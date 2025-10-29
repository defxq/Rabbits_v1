import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.accessToken = "";
        },
    }
});


export const selectCurrentToken = (state) => state.auth.accessToken;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;