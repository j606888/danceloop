import { Video } from "@/store/slices/videos";
import { DancerBadge } from "@/components/GendarItem";
import PreviewImage from "./PreviewImage";
import DateAndVisibility from "./DateAndVisibility";
import SecondaryInfo from "./SecondaryInfo";

const VideoCard = ({ video }: { video: Video }) => {

  return (
    <div className="flex flex-1 gap-2 py-2 border-b border-gray-200 w-[calc(100%-20px-92px-8px-8px)]">
      <PreviewImage video={video} />
      <div className="flex flex-col justify-between flex-1 w-[calc(100%-20px-92px-8px-8px)]">
        <div className="relative flex flex-col gap-1 p-1">
          <DateAndVisibility video={video} />
          <div>
            <h4 className="truncate text-[15px] text-[#212121]">
              {video.title}
            </h4>
           <SecondaryInfo video={video} />
            <div className="flex items-center gap-2 mt-2">
              {video?.dancers.map((dancer) => (
                <DancerBadge key={dancer.id} dancer={dancer} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
