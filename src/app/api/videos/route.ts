import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dancerName = searchParams.get("dancer");
  const danceStyle = searchParams.get("danceStyle");

  let dancerId: number | null = null;
  if (dancerName) {
    const dancer = await prisma.dancer.findUnique({
      where: { name: dancerName },
    });
    if (dancer) {
      dancerId = dancer.id;
    }
  }

  const videos = await prisma.video.findMany({
    where: {
      ...(dancerId ? { dancers: { some: { dancerId } } } : {}),
      ...(danceStyle ? { danceStyle } : {}),
    },
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
