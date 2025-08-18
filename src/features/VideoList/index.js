import videos from "@/lib/videos.json";
import VideoPreview from "./VideoPreview";

const VideoList = () => {
  return (
    <div className="grid grid-cols-3 gap-[3px]">
      {videos.map((video) => (
        <VideoPreview key={video.uid} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
