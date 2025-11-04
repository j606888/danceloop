import VisibilityChip from "@/components/VisibilityChip";
import { Video } from "@/store/slices/videos";
import { format } from "date-fns";
import { Visibility } from "@/lib/constants";
import { Dot } from "lucide-react";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

const DateAndVisibility = ({ video }: { video: Video }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-400">
        {format(new Date(video.recordedAt), "yyyy/MM/dd ")} (
        {WEEKDAYS[new Date(video.recordedAt).getDay()]})
      </p>
       <Dot className="w-[15px] h-[15px] text-gray-400" />
      <VisibilityChip visibility={video.visibility as Visibility} />
    </div>
  );
};

export default DateAndVisibility;
