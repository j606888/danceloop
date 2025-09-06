import { api } from "@/store/api";
import { Playlist } from "@prisma/client";
import { PlaylistVisibility } from "@/lib/constants";
import { Video } from "../videos";

export type PlaylistWithUser = Playlist & {
  user: {
    name: string;
  };
};

const userPlaylistsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserPlaylists: builder.query<{ result: PlaylistWithUser[] }, void>({
      query: () => ({
        url: "/user/playlists",
        method: "GET",
      }),
      providesTags: ["Playlist"],
    }),
    createUserPlaylist: builder.mutation<
      Playlist,
      { title: string; visibility: PlaylistVisibility }
    >({
      query: (data) => ({
        url: "/user/playlists",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Playlist"],
    }),
    getUserPlaylist: builder.query<
      PlaylistWithUser,
      { publicId: string }
    >({
      query: ({ publicId }) => ({
        url: `/user/playlists/${publicId}`,
        method: "GET",
      }),
      providesTags: ["Playlist"],
    }),
    addVideoToPlaylist: builder.mutation<void, { publicId: string; videoUid: string }>({
      query: ({ publicId, videoUid }) => ({
        url: `/user/playlists/${publicId}/videos`,
        method: "POST",
        body: { videoUid },
      }),
      invalidatesTags: ["Playlist"],
    }),
    getUserPlaylistVideos: builder.query<{ result: Video[] }, { publicId: string }>({
      query: ({ publicId }) => ({
        url: `/user/playlists/${publicId}/videos`,
        method: "GET",
      }),
      providesTags: ["Playlist"],
    }),
  }),
});

export const {
  useCreateUserPlaylistMutation,
  useGetUserPlaylistsQuery,
  useGetUserPlaylistQuery,
  useAddVideoToPlaylistMutation,
  useGetUserPlaylistVideosQuery,
} = userPlaylistsSlice;
