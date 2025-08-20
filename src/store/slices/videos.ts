import { api } from "../api";

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
    getVideos: builder.query<Video[], { dancer: string; danceStyle: string }>({
      query: ({ dancer, danceStyle }: { dancer?: string; danceStyle?: string }) => {
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
      providesTags: ["AdminVideo"],
    }),
    getVideo: builder.query<Video, string>({
      query: (uid) => ({
        url: `/videos/${uid}`,
        method: "GET",
      }),
      providesTags: ["AdminVideo"],
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery } = AdminVideoSlice;
