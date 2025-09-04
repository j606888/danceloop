import VideoCard from "@/components/VideoCard";
import { Video } from "@/store/slices/videos";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const VideoPreview = ({
  video,
  viewType,
}: {
  video: Video;
  viewType: "list" | "grid";
}) => {
  const duration = format(video.duration * 1000, "m:ss");
  const router = useRouter();

  if (viewType === "grid") {
    return (
      <div
        className={`relative ${
          viewType === "grid" ? "h-[180px]" : "h-20"
        } bg-gray-600 overflow-hidden cursor-pointer`}
        onClick={() => router.push(`/video/${video.uid}`)}
      >
        <img
          src={video.thumbnail}
          alt={video.uid}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 text-white p-1 text-sm font-medium">
          {duration}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex gap-1 px-2 w-full"
      onClick={() => router.push(`/video/${video.uid}`)}
    >
      <VideoCard video={video} />
    </div>
  );
};

export default VideoPreview;
