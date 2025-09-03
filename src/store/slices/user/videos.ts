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
      invalidatesTags: ["Video"],
    }),
    createUserVideo: builder.mutation<Video, { uid: string }>({
      query: ({ uid }) => ({
        url: "/user/videos",
        method: "POST",
        body: { uid, state: "UPLOADING" },
      }),
      invalidatesTags: ["Video"],
    }),
    updateUserVideo: builder.mutation<Video, { uid: string, data: any }>({
      query: ({ uid, data }) => ({
        url: `/user/videos/${uid}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Video"],
    }),
  }),
});

export const {
  useGetUserVideosQuery,
  useSyncUserVideosMutation,
  useCreateUserVideoMutation,
  useUpdateUserVideoMutation,
} = userVideosSlice;

export default userVideosSlice;
