import { api } from "@/store/api";
import { Playlist } from "@prisma/client";
import { PlaylistVisibility } from "@/lib/constants";

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
  }),
});

export const {
  useCreateUserPlaylistMutation,
  useGetUserPlaylistsQuery,
  useGetUserPlaylistQuery,
} = userPlaylistsSlice;
