import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getVideoDetail } from "@/lib/cloudflare";

export async function POST(request: Request, { params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  
  const video = await prisma.video.findUnique({
    where: { uid },
  })

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  if (!['UPLOADING', "PROCESSING"].includes(video.state)) {
    return NextResponse.json({ error: "Video not allow to sync" }, { status: 400 });
  }

  const videoDetail = await getVideoDetail(uid);
  const { readyToStream } = videoDetail

  if (!readyToStream) {
    return NextResponse.json({
      ready: false,
      message: "Video is not ready yet"
    })
  }

  await prisma.video.update({
    where: { uid },
    data: {
      state: 'READY',
      thumbnail: videoDetail.thumbnail,
      duration: videoDetail.duration,
      filename: videoDetail.meta.filename || videoDetail.meta.name,
      preview: videoDetail.preview,
      rawData: JSON.stringify(videoDetail),
    }
  })

  return NextResponse.json({
    ready: true,
    message: "Sync success"
  })
}