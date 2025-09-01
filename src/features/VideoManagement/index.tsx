"use client";

import { useGetUserVideosQuery } from "@/store/slices/user/videos";
import { Search } from "lucide-react";
import { Video } from "@/store/slices/videos";
import VideoCard from "./VideoCard";

const VideoManagement = () => {
  const { data, isLoading } = useGetUserVideosQuery({});
  const videos = data?.result;

  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-2 p-3 border border-gray-300 rounded-full">
        <Search className="w-4 h-4" />
        <input type="text" placeholder="Search" />
      </div>
      {isLoading ? <div>loading...</div> : <div>
        {videos?.map((video: Video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>}
    </div>
  );
};

export default VideoManagement;
