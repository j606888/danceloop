import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";
import { nanoid } from "nanoid";
import { ShareLinkType } from "@prisma/client";

export async function POST(request: Request) {
  const { userId } = await decodeAuthToken();
  const { type, playlistPublicId, videoUid, role } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  let playlistId: number | undefined;
  let videoId: number | undefined;

  if (type === ShareLinkType.PLAYLIST) {
    const playlist = await prisma.playlist.findUnique({
      where: { publicId: playlistPublicId },
    });
    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 400 });
    }
    playlistId = playlist.id;
  } else if (type === ShareLinkType.VIDEO) {
    const video = await prisma.video.findUnique({
      where: { uid: videoUid },
    });
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 400 });
    }
    videoId = video.id;
  }

  const publicId = await getUniquePublicId();
  // 7 days
  const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  const shareLink = await prisma.shareLink.create({
    data: { userId, type, playlistId, videoId, role, publicId, expiredAt },
  });

  return NextResponse.json(shareLink);
}

async function getUniquePublicId() {
  const publicId = nanoid(8);
  const existingShareLink = await prisma.shareLink.findUnique({
    where: { publicId },
  });
  if (existingShareLink) {
    return await getUniquePublicId();
  }
  return publicId;
}
