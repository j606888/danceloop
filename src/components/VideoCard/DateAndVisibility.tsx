import VisibilityChip from "@/components/VisibilityChip";
import { Video } from "@/store/slices/videos";
import { format } from "date-fns";
import { Visibility } from "@/lib/constants";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

const DateAndVisibility = ({ video, showVisibility = false }: { video: Video, showVisibility: boolean }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-500">
        {format(new Date(video.recordedAt), "yyyy/MM/dd ")} (
        {WEEKDAYS[new Date(video.recordedAt).getDay()]})
      </p>
      {showVisibility && (
        <VisibilityChip visibility={video.visibility as Visibility} />
      )}
    </div>
  );
};

export default DateAndVisibility;
