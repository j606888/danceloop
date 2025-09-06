import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  const { publicId } = await params;
  const { videoUid } = await request.json();
  const { userId } = await decodeAuthToken();
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const playlist = await prisma.playlist.findUnique({
    where: { publicId },
  });

  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 400 });
  }

  const video = await prisma.video.findUnique({
    where: { uid: videoUid },
  });

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 400 });
  }

  const existingPlaylistVideo = await prisma.playlistVideo.findFirst({
    where: { playlistId: playlist.id, videoId: video.id },
  });

  if (existingPlaylistVideo) {
    return NextResponse.json(
      { error: "Video already in playlist" },
      { status: 400 }
    );
  }

  await prisma.playlistVideo.create({
    data: {
      playlistId: playlist.id,
      videoId: video.id,
    },
  });

  return NextResponse.json({ success: true });
}

export async function GET(request: Request, { params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  // const { userId } = await decodeAuthToken();
  // if (!userId) {
  //   return NextResponse.json({ error: "User not found" }, { status: 400 });
  // }

  const playlist = await prisma.playlist.findUnique({
    where: { publicId },
  });

  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 400 });
  }

  const videos = await prisma.playlistVideo.findMany({
    where: { playlistId: playlist.id },
    include: {
      video: {
        include: {
          dancers: {
            include: {
              dancer: true,
            },
          },
        },
      },
    },
  });

  const videosWithDancers = videos.map((video) => ({
    ...video.video,
    dancers: video.video.dancers.map((dancer) => dancer.dancer),
  }));

  return NextResponse.json({ result: videosWithDancers });
}