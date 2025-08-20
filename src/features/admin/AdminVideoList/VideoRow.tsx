import { Video } from "@/store/slices/admin/video";
import { format } from "date-fns";
import { CreateOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const VideoRow = ({ video }: { video: Video }) => {
  const duration = format(video.duration * 1000, "m:ss");
  const recordDate = format(video.recordedAt, "yyyy-MM-dd");
  const router = useRouter();
  return (
    <div
      className="flex gap-2 items-start p-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer group"
      onClick={() => router.push(`/admin/videos/${video.id}`)}
    >
      <div className="relative w-30 h-20 flex-shrink-0">
        <img
          src={video.thumbnail}
          alt={video.uid}
          className="w-full h-full object-cover rounded-md "
        />
        <div className="absolute bottom-1 right-1 text-white p-1 text-xs font-medium bg-black/50 rounded-md">
          {duration}
        </div>
      </div>
      <div className="min-w-40 mr-auto p-2">
        <div className="text-sm font-bold text-gray-900 mb-1">
          {video.filename}
        </div>
        <div className="hidden group-hover:block">
          <CreateOutlined className="text-gray-600 w-3 h-3" />
        </div>
      </div>
      <div className="p-2 flex gap-1 overflow-x-auto">
        <div className="w-40 text-sm text-gray-500 shrink-0">{video.danceStyle}</div>
        <div className="w-40 text-sm text-gray-500 shrink-0">{video?.dancerNames?.join(" & ")}</div>
        <div className="w-30 text-sm text-gray-500 shrink-0">{video.recordType}</div>
        <div className="w-40  text-sm text-gray-500 shrink-0">{video.location}</div>
        <div className="w-30  text-sm text-gray-500 shrink-0">{recordDate}</div>
      </div>
    </div>
  );
};

export default VideoRow;
