import { api } from "@/store/api";
import { ShareLink, ShareLinkRole, ShareLinkType } from "@prisma/client";

const userShareLinkSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createUserShareLink: builder.mutation<
      ShareLink,
      {
        type: ShareLinkType;
        playlistPublicId?: string;
        videoUid?: string;
        role: ShareLinkRole;
      }
    >({
      query: (data) => ({
        url: "/user/share-link",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserShareLinkMutation } = userShareLinkSlice;
