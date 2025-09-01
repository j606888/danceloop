import { Video } from "@/store/slices/videos";
import { Earth, Dot } from "lucide-react";
import { DancerBadge } from "@/components/GendarItem";
import { format } from "date-fns";

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <div className="flex gap-2 py-2 border-b border-gray-200">
      <div className={`flex items-center justify-center flex-shrink-0 w-[92px] h-[120px] bg-gray-200 ${video.state !== "READY" ? "animate-pulse" : ""}`}>
        {video.state === "READY" ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-xs text-center m-1 text-gray-500">{video.state}</p>
        )}
      </div>
      <div className="flex flex-col justify-between flex-1 py-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#CE9D00]">
              <Earth className="w-4 h-4 " />
              <span className="text-xs">Public</span>
            </div>
            <p className="text-xs text-gray-500">
              {format(new Date(video.recordedAt), "yyyy/MM/dd hh:mm a")}
            </p>
          </div>
          <h3 className="text-sm font-medium">{video.title}</h3>
          <div className="flex flex-wrap items-center  text-xs text-gray-500">
            <span>{video.danceStyle}</span>
            {video.recordType && (
              <>
                <Dot className="w-5 h-5" />
                <span>{video.recordType}</span>
              </>
            )}
            {video?.location && (
              <>
                <Dot className="w-5 h-5" />
                <span>{video.location}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          {video?.dancers.map((dancer) => (
            <DancerBadge key={dancer.id} dancer={dancer} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
