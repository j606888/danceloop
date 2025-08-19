import { api } from "../../api";

export type Video = {
  id: number;
  uid: string;
  thumbnail: string;
  duration: number;
  filename: string;
  preview: string;
  recordedAt: string;
  rawData: string;
  createdAt: string;
  updatedAt: string;
}

const AdminVideoSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    syncVideos: builder.mutation({
      query: () => ({
        url: "/admin/videos/sync",
        method: "POST",
      }),
    }),
    getVideos: builder.query({
      query: () => ({
        url: "/admin/videos",
        method: "GET",
      }),
    }),
  }),
});

export const { useSyncVideosMutation, useGetVideosQuery } = AdminVideoSlice;
