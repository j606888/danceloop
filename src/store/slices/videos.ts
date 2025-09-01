import { api } from "../api";
import { Dancer } from "./dancers";

export type Video = {
  id: number;
  uid: string;
  title: string;
  state: string;
  thumbnail: string;
  duration: number;
  filename: string;
  dancerNames: string[];
  preview: string;
  recordedAt: string;
  danceStyle: string;
  recordType: string;
  location: string;
  rawData: string;
  createdAt: string;
  updatedAt: string;
  dancers: Dancer[];
};

const videoSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<Video[], { dancer: string; danceStyle: string }>({
      query: ({
        dancer,
        danceStyle,
      }: {
        dancer?: string;
        danceStyle?: string;
      }) => {
        const query = new URLSearchParams();
        if (dancer) {
          query.set("dancer", dancer);
        }
        if (danceStyle) {
          query.set("danceStyle", danceStyle);
        }
        return {
          url: `/videos?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Video"],
    }),
    getVideo: builder.query<Video, string>({
      query: (uid) => ({
        url: `/videos/${uid}`,
        method: "GET",
      }),
      providesTags: ["Video"],
    }),
    getUploadLink: builder.mutation({
      query: () => ({
        url: "/videos/upload",
        method: "POST",
      }),
    }),
    updateVideoState: builder.mutation({
      query: ({ uid, state }: { uid: string; state: string }) => ({
        url: `/videos/${uid}/state`,
        method: "PATCH",
        body: { state },
      }),
      invalidatesTags: ["Video"],
    }),
    syncVideo: builder.mutation<{ ready: boolean }, { uid: string | number }>({
      query: ({ uid }: { uid: string | number }) => ({
        url: `/videos/${uid}/sync`,
        method: "POST",
      }),
    }),
    updateVideo: builder.mutation<{ success: boolean }, { uid: string | number, data: any }>({
      query: ({ uid, data }: { uid: string | number, data: any }) => ({
        url: `/videos/${uid}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Video"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetUploadLinkMutation,
  useUpdateVideoStateMutation,
  useSyncVideoMutation,
  useUpdateVideoMutation,
} = videoSlice;
