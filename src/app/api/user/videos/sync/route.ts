import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getVideoDetail } from "@/lib/cloudflare";

export async function POST(request: Request) {
  const processingVideos = await prisma.video.findMany({
    where: { state: "PROCESSING" },
  });

  if (processingVideos.length === 0) {
    return NextResponse.json({ success: true });
  }

  const unreadyVideoIds = [];

  for (const video of processingVideos) {
    const videoDetail = await getVideoDetail(video.uid!);
    const { readyToStream } = videoDetail;
    if (readyToStream) {
      await prisma.video.update({
        where: { uid: video.uid! },
        data: {
          state: "READY",
          thumbnail: videoDetail.thumbnail,
          duration: videoDetail.duration,
          filename: videoDetail.meta.filename || videoDetail.meta.name,
          preview: videoDetail.preview,
          rawData: JSON.stringify(videoDetail),
        },
      });
    } else {
      unreadyVideoIds.push(video.uid!);
    }
  }

  if (unreadyVideoIds.length > 0) {
    return NextResponse.json({ success: false,unreadyVideoIds });
  } else {
    return NextResponse.json({ success: true });
  }
}
