import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";
import { MemberRole } from "@prisma/client";

export async function POST(request: Request, { params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
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

  await prisma.playlistMember.create({
    data: { playlistId: playlist.id, userId, role: MemberRole.FOLLOWER },
  });

  return NextResponse.json({ success: true });
}