import { api } from "../api";

export type Dancer = string;

const DancersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDancers: builder.query<Dancer[], void>({
      query: () => ({
        url: "/dancers",
        method: "GET",
      }),
    }),
  }),
}); 

export const { useGetDancersQuery } = DancersSlice;