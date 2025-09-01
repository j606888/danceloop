import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDirectUploadURL } from "@/lib/cloudflare";
import { decodeAuthToken } from "@/lib/auth";

export async function POST() {
  const { userId } = await decodeAuthToken();
  const { uid, uploadURL } = await getDirectUploadURL();
  const video = await prisma.video.create({
    data: {
      uid,
      userId,
    }
  })

  return NextResponse.json({ uid, uploadURL, video });
}