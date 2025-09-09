import PlaylistDetail from "@/features/PlaylistDetail";
import Navbar from "@/features/Navbar";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  ShareLinkRole,
  ShareLinkType,
  PlaylistVisibility,
} from "@prisma/client";
import { decodeAuthToken } from "@/lib/auth";

const PlaylistDetailPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ publicId: string }>;
  searchParams: Promise<{ sl: string }>;
}) => {
  const { publicId } = await params;
  const { sl } = await searchParams;
  const { userId } = await decodeAuthToken();

  const playlist = await queryPlaylist(publicId);
  if (!playlist) {
    return redirect("/404");
  }

  const shareLink = await queryShareLink(sl, playlist.id);

  if (shareLink && shareLink.role === ShareLinkRole.COLLABORATOR) {
    if (!userId) {
      return redirect(`/login?continue=/playlists/${publicId}?sl=${sl}`);
    }

    await addUserToPlaylist(playlist.id, userId);
  }

  if (playlist.visibility === PlaylistVisibility.PRIVATE) {
    if (!shareLink) {
      if (!userId) {
        return redirect("/404");
      }

      const playlistMember = await queryPlaylistMember(playlist.id, userId);
      if (!playlistMember) {
        return redirect("/404");
      }
    }
  }

  return (
    <>
      <Navbar />
      <PlaylistDetail publicId={publicId as string} />
    </>
  );
};

async function queryPlaylist(publicId: string) {
  return await prisma.playlist.findUnique({
    where: { publicId },
  });
}

async function queryShareLink(sl: string, playlistId: number) {
  return await prisma.shareLink.findFirst({
    where: {
      publicId: sl,
      type: ShareLinkType.PLAYLIST,
      playlistId,
      expiredAt: {
        gt: new Date(),
      },
    },
  });
}

async function addUserToPlaylist(playlistId: number, userId: number) {
  const existing = await prisma.playlistMember.findFirst({
    where: { playlistId, userId, role: ShareLinkRole.COLLABORATOR },
  });
  if (existing) return;

  await prisma.playlistMember.create({
    data: { playlistId, userId, role: ShareLinkRole.COLLABORATOR },
  });
}

async function queryPlaylistMember(playlistId: number, userId: number) {
  return await prisma.playlistMember.findFirst({
    where: { playlistId, userId },
  });
}

export default PlaylistDetailPage;
