import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, VideoState } from "@prisma/client";
import { VISIBILITIES } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const dancerIds = searchParams.get("dancerIds")?.split(",") || [];
  const danceStyle = searchParams.get("danceStyle");
  const recordType = searchParams.get("recordType");

  const where = {
    state: VideoState.READY,
    visibility: VISIBILITIES.PUBLIC,
    ...(title ? { title: { contains: title, mode: Prisma.QueryMode.insensitive } } : {}),
    ...(dancerIds.length > 0 ? { dancers: { some: { dancerId: { in: dancerIds.map(Number) } } } } : {}),
    ...(danceStyle ? { danceStyle } : {}),
    ...(recordType ? { recordType } : {}),
  }

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

  const videosWithDancers = videos.map((video) => ({
    ...video,
    dancers: video.dancers.map((dancer) => dancer.dancer),
  }));

  return NextResponse.json({ result: videosWithDancers });
}
