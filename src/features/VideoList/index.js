import { useState } from "react";
import { useGetVideosQuery } from "@/store/slices/videos";
import VideoPreview from "./VideoPreview";
import VideoFilter from "./VideoFilter";

const VideoList = () => {
  const [filters, setFilters] = useState({
    dancer: "",
    danceStyle: "",
  });
  const { data: videos, isLoading } = useGetVideosQuery(filters);
  const [viewType, setViewType] = useState("grid");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`relative ${viewType === "grid" ? "grid grid-cols-3 gap-[3px]" : "flex flex-col gap-2 py-1"}`}>
      {videos?.result?.map((video) => (
        <VideoPreview key={video.uid} video={video} viewType={viewType}/>
      ))}
      <VideoFilter filters={filters} setFilters={setFilters} viewType={viewType} setViewType={setViewType} />
    </div>
  );
};

export default VideoList;
