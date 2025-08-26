import { api } from "../../api";

export type Video = {
  id: number;
  uid: string;
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
};

const AdminVideoSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    syncVideos: builder.mutation({
      query: () => ({
        url: "/admin/videos/sync",
        method: "POST",
      }),
      invalidatesTags: ["AdminVideo"],
    }),
    getVideos: builder.query({
      query: () => ({
        url: "/admin/videos",
        method: "GET",
      }),
      providesTags: ["AdminVideo"],
    }),
    getVideo: builder.query<Video, string>({
      query: (id) => ({
        url: `/admin/videos/${id}`,
        method: "GET",
      }),
      providesTags: ["AdminVideo"],
    }),
    updateVideo: builder.mutation<Video, { id: string; data: Partial<Video> }>({
      query: ({ id, data }) => ({
        url: `/admin/videos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminVideo"],
    }),
    getUploadLink: builder.mutation({
      query: () => ({
        url: "/admin/videos/upload-link",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSyncVideosMutation,
  useGetVideosQuery,
  useGetVideoQuery,
  useUpdateVideoMutation,
  useGetUploadLinkMutation,
} = AdminVideoSlice;
