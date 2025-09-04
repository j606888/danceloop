import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const title = searchParams.get("title");
  const danceStyle = searchParams.get("danceStyle");
  const recordType = searchParams.get("recordType");
  const dancerIds = searchParams.get("dancerIds")?.split(",") || [];

  const { userId } = await decodeAuthToken()
  const where: any = { userId };

  if (state) {
    where.state = state;
  }
  if (title) {
    where.title = { contains: title, mode: Prisma.QueryMode.insensitive };
  }
  if (danceStyle) {
    where.danceStyle = danceStyle;
  }
  if (recordType) {
    where.recordType = recordType;
  }
  if (dancerIds.length > 0) {
    where.dancers = { some: { dancerId: { in: dancerIds.map(Number) } } };
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

  const videosWithDancers = videos.map((video) => ({
    ...video,
    dancers: video.dancers.map((dancer) => dancer.dancer),
  }));

  return NextResponse.json({
    result: videosWithDancers
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