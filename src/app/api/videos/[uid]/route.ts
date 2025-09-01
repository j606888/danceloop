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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
  const { title, dancerIds, recordedAt, danceStyle, recordType, location, visibility } = await request.json();

  const video = await prisma.video.findUnique({
    where: { uid },
  })

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }
  
  await prisma.$transaction(async (tx) => {
    await tx.video.update({
      where: { uid },
      data: { title, recordedAt, danceStyle, recordType, location, visibility },
    });
    await tx.videoDancer.deleteMany({
      where: { videoId: video.id },
    });
    await tx.videoDancer.createMany({
      data: dancerIds.map((dancerId: number) => ({ videoId: video.id, dancerId })),
    });
  })

  return NextResponse.json({ success: true });
}
