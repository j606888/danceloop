import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type StreamVideo = {
  uid: string;
  created: string;
  thumbnail: string;
  preview: string;
  meta: {
    filename: string;
  }
  duration: number;
}

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_HOST = "https://api.cloudflare.com";

export async function POST() {
  const streamSyncState = await prisma.streamSyncState.findFirst();
  const lastSyncedAt = streamSyncState?.lastSyncedAt;
  const query = lastSyncedAt ? `?start=${lastSyncedAt.toISOString()}` : "";

  const videoUrl = `${CLOUDFLARE_HOST}/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream${query}`;

  console.log('videoUrl', videoUrl);
  const response = await fetch(videoUrl, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
  });


  const data = await response.json();
  const result = data.result || [];

  if (result.length > 0) {
    await saveVideos(result);
  }
  await updateStreamSyncState();

  return NextResponse.json(data);
}

async function saveVideos(videos: StreamVideo[]) {
  const videosToCreate = videos.map((video) => ({
    uid: video.uid,
    thumbnail: video.thumbnail,
    duration: video.duration,
    filename: video.meta.filename,
    preview: video.preview,
    recordedAt: new Date(video.created),
    rawData: JSON.stringify(video),
  }));

  await prisma.video.createMany({
    data: videosToCreate,
  });
}

async function updateStreamSyncState() {
  const streamSyncState = await prisma.streamSyncState.findFirst();
  if (!streamSyncState) {
    await prisma.streamSyncState.create({
      data: { lastSyncedAt: new Date() },
    });
  }
  else {
    await prisma.streamSyncState.update({
      where: { id: streamSyncState.id },
      data: { lastSyncedAt: new Date() },
    });
  }
}
