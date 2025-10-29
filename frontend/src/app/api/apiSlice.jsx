import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        } 
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // api.dispatch(setCredentials());
    if (result?.error?.originalStatus === 401) {
        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
        if (refreshResult?.data) {
            api.dispatch(setCredentials(refreshResult.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});