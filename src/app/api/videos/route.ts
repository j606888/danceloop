import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const dancerIds = searchParams.get("dancerIds")?.split(",") || [];
  const danceStyle = searchParams.get("danceStyle");
  const recordType = searchParams.get("recordType");

  const where = {
    ...(title ? { title: { contains: title, mode: Prisma.QueryMode.insensitive } } : {}),
    ...(dancerIds.length > 0 ? { dancers: { some: { dancerId: { in: dancerIds.map(Number) } } } } : {}),
    ...(danceStyle ? { danceStyle } : {}),
    ...(recordType ? { recordType } : {}),
  }

  console.log({
    where
  })
  const videos = await prisma.video.findMany({
    where,
    orderBy: {
      recordedAt: "desc",
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
    dancerNames: video.dancers.map((dancer) => dancer.dancer.name),
  }));

  return NextResponse.json({ result: videosWithDancerNames });
}
