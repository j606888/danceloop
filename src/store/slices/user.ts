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
    }),
    login: builder.mutation<null, { email: string; password: string }>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    me: builder.query<any, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useMeQuery } = UserSlice;
