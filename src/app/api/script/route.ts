// import { deleteVideo, getAllVideos } from "@/lib/cloudflare";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
//   const videos = await getAllVideos();
//   const uids = videos.map((video: any) => video.uid);

//   for (const uid of uids) {
//     await deleteVideo(uid);
//     console.log(`Deleted video ${uid}`);
//   }

  return NextResponse.json({ success: true });
}