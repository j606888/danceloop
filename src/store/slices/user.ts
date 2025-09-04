import { api } from "../api";

const UserSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<
      null,
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<null, { email: string; password: string }>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    me: builder.query<any, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
} = UserSlice;
