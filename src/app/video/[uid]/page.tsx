import { redirect } from "next/navigation";
import VideoDetail from "@/features/VideoDetail";
import prisma from "@/lib/prisma";
import { decodeAuthToken } from "@/lib/auth";

const VideoPage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;

  const video = await prisma.video.findUnique({
    where: { uid },
  });

  if (!video) {
    return redirect("/404");
  }

  if (video.visibility === "private") {
    const { userId } = await decodeAuthToken();
    if (!userId) {
      return redirect("/404");
    }

    const playlistVideos = await prisma.playlistVideo.findMany({
      where: { videoId: video.id },
    });

    const playlistIds = playlistVideos.map(
      (playlistVideo) => playlistVideo.playlistId
    );

    const playlistMembers = await prisma.playlistMember.findMany({
      where: { playlistId: { in: playlistIds }, userId },
    });
    if (playlistMembers.length === 0 && video.userId !== userId) {
      return redirect("/404");
    }
  }

  return <VideoDetail video={video} />;
};

export default VideoPage;
