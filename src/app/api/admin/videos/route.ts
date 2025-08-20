import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const videos = await prisma.video.findMany({
    include: {
      dancers: {
        include: {
          dancer: true,
        },
      },
    },
    orderBy: {
      recordedAt: "desc",
    },
  });

  const videosWithDancerNames = videos.map((video) => ({
    ...video,
    dancerNames: video.dancers.map((dancer) => dancer.dancer.name),
  }));

  return NextResponse.json(videosWithDancerNames);
}