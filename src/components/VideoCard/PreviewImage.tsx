import { Video } from "@/store/slices/videos";
import { format } from "date-fns";

const PreviewImage = ({
  video,
  onClick,
}: {
  video: Video;
  from?: string;
  onClick?: () => void;
}) => {
  const duration = format(video.duration * 1000, "m:ss");
  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 w-[92px] h-[108px] bg-gray-200 ${
        video.state !== "READY" ? "animate-pulse" : ""
      }`}
      onClick={onClick}
    >
      {video.state === "READY" ? (
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <p className="text-xs text-center m-1 text-gray-500">{video.state}</p>
      )}
      {duration && (
        <div className="absolute bottom-1.5 right-1.5 text-white p-1 text-xs font-medium bg-black/50 rounded-md">
          {duration}
        </div>
      )}
    </div>
  );
};

export default PreviewImage;
