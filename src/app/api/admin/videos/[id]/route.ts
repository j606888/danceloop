import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const video = await prisma.video.findUnique({
    where: { id: parseInt(id) },
  });

  const dancers = await prisma.videoDancer.findMany({
    where: { videoId: parseInt(id) },
    include: {
      dancer: true,
    },
  });

  return NextResponse.json({
    ...video,
    dancerNames: dancers.map((dancer) => dancer.dancer.name),
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const {
    filename,
    danceStyle,
    dancerNames,
    recordType,
    location,
    recordedAt,
  } = await request.json();

  await upsertDancers(dancerNames, parseInt(id));

  await prisma.video.update({
    where: { id: parseInt(id) },
    data: {
      filename,
      danceStyle,
      recordType,
      location,
      recordedAt,
    },
  });

  return NextResponse.json({ success: true });
}

async function upsertDancers(dancerNames: string[], videoId: number) {
  for (const dancerName of dancerNames) {
    await prisma.dancer.upsert({
      where: { name: dancerName },
      create: { name: dancerName },
      update: {},
    });
  }

  const dancers = await prisma.dancer.findMany({
    where: { name: { in: dancerNames } },
  });

  await prisma.videoDancer.deleteMany({
    where: { videoId },
  });

  await prisma.videoDancer.createMany({
    data: dancers.map((dancer) => ({
      videoId,
      dancerId: dancer.id,
    })),
  });
}
