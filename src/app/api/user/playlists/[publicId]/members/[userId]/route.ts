import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";
import { Playlist } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ publicId: string; userId: string }> }
) {
  const { publicId, userId } = await params;
  const { role } = await request.json();

  const playlist = await prisma.playlist.findUnique({
    where: { publicId },
  });
  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 400 });
  }
  validateOwner(playlist);
  const playlistMember = await prisma.playlistMember.findFirst({
    where: { playlistId: playlist.id, userId: parseInt(userId) },
  });
  if (!playlistMember) {
    return NextResponse.json(
      { error: "Playlist member not found" },
      { status: 400 }
    );
  }

  await prisma.playlistMember.update({
    where: { id: playlistMember.id },
    data: { role },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ publicId: string; userId: string }> }
) {
  const { publicId, userId } = await params;

  const playlist = await prisma.playlist.findUnique({
    where: { publicId },
  });
  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 400 });
  }
  validateOwner(playlist);
  const playlistMember = await prisma.playlistMember.findFirst({
    where: { playlistId: playlist.id, userId: parseInt(userId) },
  });
  if (!playlistMember) {
    return NextResponse.json(
      { error: "Playlist member not found" },
      { status: 400 }
    );
  }

  await prisma.playlistMember.delete({
    where: { id: playlistMember.id },
  });

  return NextResponse.json({ success: true });
}

async function validateOwner(playlist: Playlist) {
  const { userId: ownerId } = await decodeAuthToken();
  if (!ownerId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (playlist.userId !== ownerId) {
    return NextResponse.json(
      { error: "You are not the owner of the playlist" },
      { status: 400 }
    );
  }
}
