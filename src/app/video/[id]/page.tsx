"use client"

import { useParams } from "next/navigation";
import VideoDetail from "@/features/VideoDetail";
import videos from "@/lib/videos.json";

const VideoPage = () => {
  const { id } = useParams();

  if (!id) return <div>No video found</div>;

  const video = videos.find((video) => video.uid === id);

  if (!video) return <div>No video found</div>;

  return <VideoDetail videoUid={video.uid} />;
};

export default VideoPage;