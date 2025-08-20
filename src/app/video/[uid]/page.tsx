"use client"

import { useParams } from "next/navigation";
import VideoDetail from "@/features/VideoDetail";
import { useGetVideoQuery } from "@/store/slices/videos";

const VideoPage = () => {
  const { uid } = useParams();

  const { data: video } = useGetVideoQuery(uid as string);

  if (!video) return <div>No video found</div>;

  return <VideoDetail videoUid={video.uid} />;
};

export default VideoPage;