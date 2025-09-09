import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";
import { nanoid } from "nanoid";
import { MemberRole } from "@prisma/client";

type PlaylistType = "mine" | "followed" | "explore";

export async function GET(request: Request) {
  const { userId } = await decodeAuthToken();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as PlaylistType;

  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  let playlistMembers: any[] = [];

  if (type === "mine") {
    playlistMembers = await prisma.playlistMember.findMany({
      where: { userId, role: { in: [MemberRole.OWNER, MemberRole.COLLABORATOR] } },
    });
  } else if (type === "followed") {
    playlistMembers = await prisma.playlistMember.findMany({
      where: { userId, role: MemberRole.FOLLOWER },
    });
  } else if (type === "explore") {
    playlistMembers = [];
  }

  const playlists = await prisma.playlist.findMany({
    where: { id: { in: playlistMembers.map((member) => member.playlistId) } },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          videos: true,
        },
      },
    },
  });

  const formattedPlaylists = playlists.map((playlist) => ({
    ...playlist,
    videoCount: playlist._count.videos,
  }));

  return NextResponse.json({ result: formattedPlaylists });
}

export async function POST(request: Request) {
  const { userId } = await decodeAuthToken();

  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const publicId = await getUniquePublicId();

  const { title, visibility } = await request.json();

  const playlist = await prisma.$transaction(async (tx) => {
    const p = await tx.playlist.create({
      data: { userId, title, visibility, publicId },
    });
    await tx.playlistMember.create({
      data: { playlistId: p.id, userId, role: MemberRole.OWNER },
    });
    return p;
  });

  return NextResponse.json(playlist);
}

async function getUniquePublicId() {
  const publicId = nanoid(8);
  const existingPlaylist = await prisma.playlist.findUnique({
    where: { publicId },
  });
  if (existingPlaylist) {
    return await getUniquePublicId();
  }
  return publicId;
}
