import { DANCE_STYLES, RECORD_TYPES } from "@/lib/constants";
import { Video } from "@/store/slices/videos";
import { Dancer } from "@/store/slices/dancers";
import { Dot } from "lucide-react";

const SecondaryInfo = ({ video, dancers }: { video: Video, dancers: Dancer[] }) => {
  const danceStyle = DANCE_STYLES.find(
    (style) => style.value === video.danceStyle
  );
  const recordType = RECORD_TYPES.find(
    (type) => type.value === video.recordType
  );
  const dancerNames = dancers.map((dancer) => dancer.name).join(", ");

  return (
    <div className="flex flex-wrap items-center text-xs text-gray-400 ">
      <span>{danceStyle?.label}</span>
      {recordType && (
        <>
          <Dot className="w-[15px] h-[15px]" />
          <span>{recordType?.label}</span>
        </>
      )}
      {video?.location && (
        <>
          <Dot className="w-[15px] h-[15px]" />
          <span>{video.location}</span>
        </>
      )}
      {dancerNames && (
        <>
          <Dot className="w-[15px] h-[15px]" />
          <span>{dancerNames}</span>
        </>
      )}
    </div>
  );
};

export default SecondaryInfo;
