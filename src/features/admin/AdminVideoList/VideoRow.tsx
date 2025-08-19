import { Video } from "@/store/slices/admin/video";
import { format } from "date-fns";
import { CreateOutlined } from "@mui/icons-material";

const VideoRow = ({ video }: { video: Video }) => {
  const duration = format(video.duration * 1000, "m:ss");

  return (
    <div className="flex gap-2 items-start p-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer group">
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
        <div className="text-sm font-bold text-gray-900 mb-1">{video.filename}</div>
        <div className="hidden group-hover:block">
          <CreateOutlined className="text-gray-600 w-3 h-3" />
        </div>
      </div>
      <div className="p-2 flex gap-1 overflow-x-auto">
        <div className="w-40 text-sm text-gray-500 shrink-0">Bachata</div>
        <div className="w-40 text-sm text-gray-500 shrink-0">Nora & 丁丁</div>
        <div className="w-30 text-sm text-gray-500 shrink-0">Party</div>
        <div className="w-40  text-sm text-gray-500 shrink-0">Banana</div>
        <div className="w-30  text-sm text-gray-500 shrink-0">2025-08-18</div>
      </div>
    </div>
  );
};

export default VideoRow;
