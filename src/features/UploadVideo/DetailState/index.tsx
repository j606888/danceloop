import { useMemo, useRef, useState } from "react";
import RadioGroup from "@/components/RadioGroup";
import UploadToast from "@/components/UploadToast";
import DancersInput from "./DancersInput";
import { Calendar, Clock } from "lucide-react";
import { useUpdateVideoMutation } from "@/store/slices/videos";
import { useRouter } from "next/navigation";

const DetailState = ({
  videoUid,
  uploadSuccess,
  uploadProgress,
}: {
  videoUid: number;
  uploadSuccess: boolean;
  uploadProgress: number;
}) => {
  const timeRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [dancerIds, setDancerIds] = useState<number[]>([]);
  const [recordedDate, setRecordedDate] = useState<string>("");
  const [recordedTime, setRecordedTime] = useState<string>("");
  const [danceStyle, setDanceStyle] = useState<string>("");
  const [recordType, setRecordType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const recordedAt = useMemo(() => combineLocalToISOString(recordedDate, recordedTime), [recordedDate, recordedTime]);
  const [updateVideo] = useUpdateVideoMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await updateVideo({
        uid: videoUid,
        data: { title, dancerIds, recordedAt, danceStyle, recordType, location, visibility },
      }).unwrap()

      router.push("/video-management")
    } catch(error) {
      console.error(error)
    }
  };

  return (
    <div className="px-5 py-5 bg-[#F0F1F6]">
      <UploadToast
        videoUid={videoUid}
        uploadProgress={uploadProgress}
        uploadSuccess={uploadSuccess}
      />
      <h2 className="font-bold py-4">Video Details</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[#444444] font-medium" htmlFor="videoTitle">
            Video Title
          </label>
          <input
            type="text"
            className="p-3 py-4 rounded-[12px] bg-white outline-[#6784F6]"
            placeholder="Bachata Lv2 / Lesson 3 / Head movement"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <DancersInput dancerIds={dancerIds} setDancerIds={setDancerIds} />
        <div className="flex flex-col gap-1">
          <label className="text-[#444444] font-medium" htmlFor="RecordAt">
            Record at
          </label>
          <div className="flex gap-2 w-full">
            <div className="relative w-full">
              <input
                type="date"
                className="w-full p-3 py-4 rounded-[12px] bg-white outline-[#6784F6]"
                placeholder="2025-08-17"
                ref={dateRef}
                value={recordedDate}
                onChange={(e) => setRecordedDate(e.target.value)}

              />
              <Calendar
                className="w-5  absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => dateRef.current?.showPicker()}
              />
            </div>
            <div className="relative w-60">
              <input
                ref={timeRef}
                type="time"
                className="w-full p-3 py-4 rounded-[12px] bg-white outline-[#6784F6]"
                placeholder="2025-08-17 16:34"
                value={recordedTime}
                onChange={(e) => setRecordedTime(e.target.value)}
              />
              <Clock
                onClick={() => timeRef.current?.showPicker()}

                className="w-5 absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
        <RadioGroup
          label="Dance Style"
          options={["Bachata", "Salsa", "Zouk"]}
          value={danceStyle}
          onChange={(value) => setDanceStyle(value)}
        />
        <RadioGroup
          label="Dance Type"
          options={["Party", "Course", "Workshop", "Other"]}
          value={recordType}
          onChange={(value) => setRecordType(value)}
        />
        <div className="flex flex-col gap-1">
          <label className="text-[#444444] font-medium" htmlFor="Location">
            Location (Optional)
          </label>
          <input
            type="text"
            className="p-3 rounded-[12px] bg-white outline-[#6784F6]"
            placeholder="Social Hub"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <RadioGroup label="Visibility" options={["Public", "Private"]} value={visibility} onChange={(value) => setVisibility(value)} />
        <button className="bg-[#6784F6] text-white p-3 rounded-[12px] font-medium" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};


function combineLocalToISOString(dateStr: string, timeStr: string) {
  if (!dateStr || !timeStr) return '';

  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);

  // Construct a Date in the user's local timezone
  const localDate = new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0);

  // Convert to UTC ISO string
  return localDate.toISOString();
}

export default DetailState;
