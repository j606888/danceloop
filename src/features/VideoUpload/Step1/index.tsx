import ChoiseChips from "@/components/ChoiseChips";
import { Footer, Stepper, DatePicker, TimePicker } from "../shared";
import {
  DanceStyle,
  RecordType,
  VideoDraft,
  DANCE_STYLES,
  DANCE_TYPES,
} from "../videoDraft";

const Step1 = ({
  draft,
  setField,
  progress,
  onNext,
}: {
  draft: VideoDraft;
  setField: <K extends keyof VideoDraft>(k: K) => (v: VideoDraft[K]) => void;
  progress: number;
  onNext: () => void;
}) => {
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
            value={draft.title}
            onChange={(e) => setField("title")(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[#21212] text-sm font-medium mb-1">
            舞種
          </label>
          <ChoiseChips
            options={DANCE_STYLES}
            value={draft.danceStyle}
            onChange={(value) =>
              setField("danceStyle")(
                draft.danceStyle === value ? "" : (value as DanceStyle)
              )
            }
          />
        </div>
        <div>
          <label className="block text-[#21212] text-sm font-medium mb-1">
            類型
          </label>
          <ChoiseChips
            options={DANCE_TYPES}
            value={draft.recordType}
            onChange={(value) =>
              setField("recordType")(
                draft.recordType === value ? "" : (value as RecordType)
              )
            }
          />
        </div>
        <div className="mb-30">
          <label className="block text-[#21212] text-sm font-medium mb-1">
            時間
          </label>
          <div className="flex gap-3 w-full">
            <DatePicker
              value={draft.recordedDate}
              onChange={setField("recordedDate")}
            />
            <TimePicker
              value={draft.recordedTime}
              onChange={setField("recordedTime")}
            />
          </div>
        </div>
      </div>
      <Footer progress={progress} onNext={onNext} />
    </>
  );
};

export default Step1;
