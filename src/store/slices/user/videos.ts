import { api } from "@/store/api";
import { Video } from "../videos";

const userVideosSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserVideos: builder.query<{ result: Video[] }, { state?: string }>({
      query: ({ state } = {}) => {
        const query = new URLSearchParams();
        if (state) {
          query.set("state", state);
        }
        const qs = query.toString();
        return `/user/videos${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Video"],
    }),
    syncUserVideos: builder.mutation<
      { success: boolean; unreadyVideoIds?: string[] },
      void
    >({
      query: () => ({
        url: "/user/videos/sync",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetUserVideosQuery, useSyncUserVideosMutation } =
  userVideosSlice;

export default userVideosSlice;