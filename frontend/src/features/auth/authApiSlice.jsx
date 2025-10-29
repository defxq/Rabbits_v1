// login logout register

import { apiSlice } from "../../app/api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            })
        }),
        logout: builder.query({
            query: () => "/auth/logout",
        }),
        refresh: builder.query({
            query: () => "/auth/refresh",
        }),
        ping: builder.query({
            query: () => "/ping"
        })
    })
});


export const {
    useRegisterMutation,
    useLoginMutation,
    useLazyLogoutQuery,
    useLazyRefreshQuery,
    useLazyPingQuery,
} = authApiSlice;