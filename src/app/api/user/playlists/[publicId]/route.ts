import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  // const { userId } = await decodeAuthToken();
  // if (!userId) {
  //   return NextResponse.json({ error: "User not found" }, { status: 400 });
  // }

  const playlist = await prisma.playlist.findUnique({
    where: { publicId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 400 });
  }

  const playlistMembers = await prisma.playlistMember.findMany({
    where: { playlistId: playlist.id},
    include: {
      user: {
        select: {
          name: true,
          id: true
        },
      },
    },
  });

  const formattedPlaylistMembers = playlistMembers.map((member) => ({
    ...member,
    userId: member.user.id,
    name: member.user.name,
  }));

  return NextResponse.json({ ...playlist, members: formattedPlaylistMembers });
}