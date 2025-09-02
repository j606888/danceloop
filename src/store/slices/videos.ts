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
    getVideos: builder.query<Video[], { title: string; dancerIds: number[]; danceStyle: string; recordType: string }>({
      query: ({
        title,
        dancerIds,
        danceStyle,
        recordType,
      }: {
        title: string;
        dancerIds: number[];
        danceStyle: string;
        recordType: string;
      }) => {
        const query = new URLSearchParams();
        if (title) {
          query.set("title", title);
        }
        if (dancerIds.length > 0) {
          query.set("dancerIds", dancerIds.join(","));
        }
        if (danceStyle) {
          query.set("danceStyle", danceStyle);
        }
        if (recordType) {
          query.set("recordType", recordType);
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
