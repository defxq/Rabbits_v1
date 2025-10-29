import { apiSlice } from "../../app/api/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => "/users/all",
            keepUnusedDataFor: 100,
        }),
        getMe: builder.query({
            query: () => "/users/me",
            keepUnusedDataFor: 100,
        }),
    })
});

export const {
    useGetAllUsersQuery,
    useGetMeQuery,
} = usersApiSlice;