import ChoiseChips from "@/components/ChoiseChips";
import { Footer, Stepper, DatePicker, TimePicker } from "../shared";
import { useState } from "react";

const DANCE_STYLES = ["Bachata", "Salsa", "Zouk", "Kizomba"];
const DANCE_TYPES = ["Party", "Course", "Workshop", "Other"];

const Step1 = ({
  onNext,
  progress,
}: {
  onNext: () => void;
  progress: number;
}) => {
  const [danceStyle, setDanceStyle] = useState("");
  const [danceType, setDanceType] = useState("");
  const [recordedDate, setRecordedDate] = useState("");
  const [recordedTime, setRecordedTime] = useState("");

  const handleDanceStyleChange = (value: string) => {
    if (danceStyle === value) {
      setDanceStyle("");
    } else {
      setDanceStyle(value);
    }
  };

  const handleDanceTypeChange = (value: string) => {
    if (danceType === value) {
      setDanceType("");
    } else {
      setDanceType(value);
    }
  };

  return (
    <>
      <Stepper step={1} title="詳細資訊" preview={null} />
      <div className="px-5 py-3 flex flex-col gap-4">
        <div>
          <label className="block text-[#21212] text-sm font-medium mb-1">
            標題
          </label>
          <input
            type="text"
            placeholder="影片標題"
            className="w-full p-3 rounded-md border border-[#E5E5E5] text-[#212121] outline-[#6784F6]"
          />
        </div>
        <div>
          <label className="block text-[#21212] text-sm font-medium mb-1">
            舞種
          </label>
          <ChoiseChips
            options={DANCE_STYLES}
            value={danceStyle}
            onChange={handleDanceStyleChange}
          />
        </div>
        <div>
          <label className="block text-[#21212] text-sm font-medium mb-1">
            類型
          </label>
          <ChoiseChips
            options={DANCE_TYPES}
            value={danceType}
            onChange={handleDanceTypeChange}
          />
        </div>
        <div className="mb-30">
          <label className="block text-[#21212] text-sm font-medium mb-1">
            時間
          </label>
          <div className="flex gap-3 w-full">
            <DatePicker value={recordedDate} onChange={setRecordedDate} />
            <TimePicker value={recordedTime} onChange={setRecordedTime} />
          </div>
        </div>
      </div>
      <Footer progress={progress} onNext={onNext} />
    </>
  );
};

export default Step1;
