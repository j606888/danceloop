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
  const missingInfo = !video.danceStyle &&  video.dancerNames.length === 0;

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
      className="relative flex gap-2 items-start px-2"
      onClick={() => router.push(`/video/${video.uid}`)}
    >
      <div className="relative w-24 h-24 flex-shrink-0">
        <img
          src={video.thumbnail}
          alt={video.uid}
          className="w-full h-full object-cover rounded-md "
        />
        <div className="absolute bottom-1 right-1 text-white p-1 text-xs font-medium bg-black/50 rounded-md">
          {duration}
        </div>
      </div>
      <div className="flex flex-col h-full justify-between py-2 gap-1">
        <div className="text-base text-gray-900">
          {video.filename}
        </div>
        <div className="text-sm text-gray-400">
          {missingInfo ? (
            "還沒整理"
          ) : (
            <>
              {video.danceStyle} | {video.dancerNames?.join(" & ")}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
