import VideoPreview from "./VideoPreview";
import { useState } from "react";

import { useGetVideosQuery } from "@/store/slices/videos";
import VideoFilter from "./VideoFilter";

const VideoList = () => {
  const [filters, setFilters] = useState({
    dancer: "",
    danceStyle: "",
  });
  const { data: videos, isLoading } = useGetVideosQuery(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative grid grid-cols-3 gap-[3px]">
      {videos?.result?.map((video) => (
        <VideoPreview key={video.uid} video={video} />
      ))}
      <VideoFilter filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default VideoList;
