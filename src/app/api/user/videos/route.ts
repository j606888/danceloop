import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");

  const { userId } = await decodeAuthToken()
  const where: any = { userId };

  if (state) {
    where.state = state;
  }
  const videos = await prisma.video.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      dancers: {
        include: {
          dancer: true,
        },
      },
    },
  });

  const videosWithDancerNames = videos.map((video) => ({
    ...video,
    dancers: video.dancers.map((dancer) => dancer.dancer),
  }));

  return NextResponse.json({
    result: videosWithDancerNames
  });
}

export async function POST(request: Request) {
  const { userId } = await decodeAuthToken();
  const { uid } = await request.json();

  const video = await prisma.video.create({
    data: { userId, uid, state: "DRAFT" },
  });

  return NextResponse.json(video);
}