import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
  const video = await prisma.video.findUnique({
    where: { uid },
  });

  const dancers = await prisma.videoDancer.findMany({
    where: { videoId: video?.id },
    include: {
      dancer: true,
    },
  });

  return NextResponse.json({
    ...video,
    dancerNames: dancers.map((dancer) => dancer.dancer.name),
  });
}
