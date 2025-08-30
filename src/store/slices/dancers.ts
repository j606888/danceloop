import { api } from "../api";

export type Dancer = {
  id: number;
  name: string;
  gender: string;
  isTeacher: boolean;
  createdAt: string;
  updatedAt: string;
};

const DancersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDancers: builder.query<Dancer[], void>({
      query: () => ({
        url: "/dancers",
        method: "GET",
      }),
      providesTags: ["Dancers"],
    }),
    createDancer: builder.mutation<
      Dancer,
      { name: string; gender: string; isTeacher: boolean }
    >({
      query: (data) => ({
        url: "/dancers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dancers"],
    }),
  }),
});

export const { useGetDancersQuery, useCreateDancerMutation } = DancersSlice;
