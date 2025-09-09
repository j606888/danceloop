import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";
import { Playlist } from "@prisma/client";
import { HttpError, raise } from "@/lib/httpError";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ publicId: string; userId: string }> }
) {
  const { publicId, userId } = await params;
  const { role } = await request.json();

  try {
    const playlist = await queryPlaylist(publicId);
    await validateOwner(playlist);
    const playlistMember = await queryPlaylistMember(
      playlist.id,
      parseInt(userId)
    );
    await prisma.playlistMember.update({
      where: { id: playlistMember.id },
      data: { role },
    });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ publicId: string; userId: string }> }
) {
  const { publicId, userId } = await params;

  try {
    const playlist = await queryPlaylist(publicId);
    await validateOwner(playlist);
    const playlistMember = await queryPlaylistMember(
      playlist.id,
      parseInt(userId)
    );
    await prisma.playlistMember.delete({
      where: { id: playlistMember.id },
    });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

async function validateOwner(playlist: Playlist): Promise<void> {
  const { userId: ownerId } = await decodeAuthToken();
  if (!ownerId) {
    raise(400, "User not found");
  }

  if (playlist.userId !== ownerId) {
    raise(400, "You are not the owner of the playlist");
  }
}

async function queryPlaylist(publicId: string) {
  const playlist = await prisma.playlist.findUnique({
    where: { publicId },
  });
  if (!playlist) {
    raise(400, "Playlist not found");
  }
  return playlist;
}

async function queryPlaylistMember(playlistId: number, userId: number) {
  const playlistMember = await prisma.playlistMember.findFirst({
    where: { playlistId, userId },
  });
  if (!playlistMember) {
    raise(400, "Playlist member not found");
  }
  return playlistMember;
}
