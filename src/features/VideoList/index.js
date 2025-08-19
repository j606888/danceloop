import VideoPreview from "./VideoPreview";
import { useState, useEffect } from "react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch("/api/videos");
      const data = await response.json();
      setVideos(data.result);
    };
    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-[3px]">
      {videos.map((video) => (
        <VideoPreview key={video.uid} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
