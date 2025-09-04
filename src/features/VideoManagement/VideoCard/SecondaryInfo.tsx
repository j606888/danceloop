import { DANCE_STYLES, RECORD_TYPES } from "@/lib/constants";
import { Video } from "@/store/slices/videos";
import { Dot } from "lucide-react";

const SecondaryInfo = ({ video }: { video: Video }) => {
  const danceStyle = DANCE_STYLES.find(
    (style) => style.value === video.danceStyle
  );
  const recordType = RECORD_TYPES.find(
    (type) => type.value === video.recordType
  );

  return (
    <div className="flex flex-wrap items-center  text-sm text-gray-500 ">
      <span>{danceStyle?.label}</span>
      {recordType && (
        <>
          <Dot className="w-5 h-5" />
          <span>{recordType?.label}</span>
        </>
      )}
      {video?.location && (
        <>
          <Dot className="w-5 h-5" />
          <span>{video.location}</span>
        </>
      )}
    </div>
  );
};

export default SecondaryInfo;
