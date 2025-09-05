import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  const { userId } = await decodeAuthToken();
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const playlist = await prisma.playlist.findUnique({
    where: { publicId },
    include: {
      user: {
        select: {
          name: true,
        },
      }
    },
  });

  return NextResponse.json(playlist);
}