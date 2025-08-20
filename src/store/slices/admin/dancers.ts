import { api } from "../../api";

export type Dancer = string;

const AdminDancersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDancers: builder.query<Dancer[], void>({
      query: () => ({
        url: "/admin/dancers",
        method: "GET",
      }),
    }),
  }),
}); 

export const { useGetDancersQuery } = AdminDancersSlice;