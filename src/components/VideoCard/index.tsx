import { Video } from "@/store/slices/videos";
import PreviewImage from "./PreviewImage";
import DateAndVisibility from "./DateAndVisibility";
import SecondaryInfo from "./SecondaryInfo";
// import { EllipsisVertical } from 'lucide-react';
import { PlayCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const VideoCard = ({
  video,
  from,
}: {
  video: Video;
  from?: string;
}) => {
  const router = useRouter();
  const onPlay = () => {
    router.push(`/video/${video.uid}?from=${from ?? ""}`);
  };
  return (
    <div className="flex flex-1 gap-2 w-[calc(100%-20px-92px-8px-8px)]">
      <PreviewImage video={video} from={from} onClick={onPlay} />
      <div className="flex flex-col justify-between flex-1 w-[calc(100%-20px-92px-8px-8px)] border-b border-gray-200">
        <div className="relative flex flex-col gap-1 py-1 h-full">
          <h4 className="line-clamp-2 text-[15px] text-[#212121] leading-[1.2] ">
            {video.title}
          </h4>
          <SecondaryInfo video={video} dancers={video?.dancers}/>
          <div className="flex-1 flex items-end justify-between">
            <DateAndVisibility video={video} />
            <div className="flex items-center gap-1 pr-2">
              {/* <EllipsisVertical className="w-[28px] h-[28px] text-[#333333]" /> */}
              <PlayCircle sx={{ fontSize: 28 }} className="text-[#333333]" onClick={onPlay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
