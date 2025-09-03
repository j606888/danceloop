import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
  const { title, danceStyle, recordType, dancerIds, recordedAt, visibility } =
    await request.json();

  const video = await prisma.video.findUnique({
    where: { uid },
  });

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.video.update({
      where: { uid },
      data: { title, recordedAt, danceStyle, recordType, visibility },
    });
    await tx.videoDancer.deleteMany({
      where: { videoId: video.id },
    });
    await tx.videoDancer.createMany({
      data: dancerIds.map((dancerId: number) => ({
        videoId: video.id,
        dancerId,
      })),
    });
  });

  return NextResponse.json({ success: true });
}
