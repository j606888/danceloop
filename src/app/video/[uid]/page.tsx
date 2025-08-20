"use client";

import { useParams } from "next/navigation";
import VideoDetail from "@/features/VideoDetail";
import { useGetVideoQuery } from "@/store/slices/videos";
import { PulseLoader } from "react-spinners";

const VideoPage = () => {
  const { uid } = useParams();

  const { data: video, isLoading } = useGetVideoQuery(uid as string);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={20} color="#4A81D9" />
      </div>
    );
  if (!video) return <div>No video found</div>;

  return <VideoDetail videoUid={video.uid} />;
};

export default VideoPage;
