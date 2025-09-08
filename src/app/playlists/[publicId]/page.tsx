
import PlaylistDetail from "@/features/PlaylistDetail";
import Navbar from "@/features/Navbar";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ShareLink, ShareLinkRole, ShareLinkType } from "@prisma/client";
import { decodeAuthToken } from "@/lib/auth";

const PlaylistDetailPage = async ({
  params, searchParams
}: { params: { publicId: string }; searchParams: { sl: string } }) => {
  const { publicId } = await params;
  const { sl } = await searchParams;
  const { userId } = await decodeAuthToken();

  let shareLink: ShareLink | null = null;

  if (sl) {
    shareLink = await prisma.shareLink.findUnique({
      where: { publicId: sl, type: ShareLinkType.PLAYLIST },
    });

    if (!shareLink) {
      return redirect("/404");
    }

    if (shareLink.role === ShareLinkRole.COLLABORATOR) {
      if (!userId) {
        return redirect(`/login?continue=/playlists/${publicId}?sl=${sl}`);
      }

      const playlist = await prisma.playlist.findUnique({
        where: { publicId },
      });

      if (!playlist) {
        return redirect("/404");
      }

      const existing = await prisma.playlistMember.findFirst({
        where: { playlistId: playlist.id, userId, role: ShareLinkRole.COLLABORATOR },
      });
      if (!existing) {
        await prisma.playlistMember.create({
          data: { playlistId: playlist.id, userId, role: ShareLinkRole.COLLABORATOR },
        });
      }
    }
  }
  
  return <>
    <Navbar />
    <PlaylistDetail publicId={publicId as string} />
  </>;
};

export default PlaylistDetailPage;