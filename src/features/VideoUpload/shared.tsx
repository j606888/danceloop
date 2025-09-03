import { Calendar, Clock, TvMinimalPlay, X } from "lucide-react";
import { useRef, useState } from "react";

export const Stepper = ({
  step,
  title,
  preview,
}: {
  step: number;
  title: string;
  preview: string | null;
}) => {
  return (
    <div className="px-5 py-4 bg-white flex flex-col gap-1.5 border-b border-[#E5E5E5]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-[#454545] font-medium mr-2">
            步驟 {step}/3
          </span>
          <span className="text-sm text-[#777777]">{title}</span>
        </div>
        <VideoPreview preview={preview} />
      </div>
      <div className="flex gap-2">
        <div
          className={`w-full h-[6px] rounded-full ${
            step >= 1 ? "bg-[#6784F6]" : "bg-[#E3E8FB]"
          }`}
        />
        <div
          className={`w-full h-[6px] rounded-full ${
            step >= 2 ? "bg-[#6784F6]" : "bg-[#E3E8FB]"
          }`}
        />
        <div
          className={`w-full h-[6px] rounded-full ${
            step >= 3 ? "bg-[#6784F6]" : "bg-[#E3E8FB]"
          }`}
        />
      </div>
    </div>
  );
};

export const Footer = ({
  progress,
  onNext,
  onBack,
  onNextText = "繼續",
  onNextDisabled = false,
}: {
  progress: number;
  onNext: () => void;
  onBack?: () => void;
  onNextText?: string;
  onNextDisabled?: boolean;
}) => {
  return (
    <div className="px-5 py-3 bg-white fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-[#E5E5E5]">
      <div className="text-sm text-[#777777] font-medium">
        {progress === 100 ? "上傳完成" : `上傳中 ${progress}%`}
      </div>
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-[#6784F6] border-1 border-[#6784F6] rounded-full px-4 h-[36px]"
          >
            上一步
          </button>
        )}
        <button
          className="text-sm text-white bg-[#6784F6] rounded-full px-4 h-[36px] disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={onNextDisabled}
        >
          {onNextText}
        </button>
      </div>
    </div>
  );
};

const VideoPreview = ({ preview }: { preview: string | null }) => {
  const [open, setOpen] = useState(false);
  if (!preview) return null;

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer text-[#454545]"
        onClick={() => setOpen(true)}
      >
        <TvMinimalPlay className="w-5 h-5" />
        <span className="text-sm">預覽</span>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="absolute h-[70vh] w-full bg-[#232323] flex items-center justify-center">
            <X
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-6 h-6 cursor-pointer text-white z-100"
            />
            <video src={preview} controls className="h-full w-full" />
          </div>
        </div>
      )}
    </>
  );
};

export const DatePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      <input
        type="date"
        id="date"
        name="date"
        className="w-full p-3 py-4 rounded-[12px] bg-white outline-[#6784F6]"
        placeholder="2025-08-17"
        ref={dateRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Calendar
        className="w-5  absolute right-3 top-1/2 -translate-y-1/2"
        onClick={() => dateRef.current?.showPicker()}
      />
    </div>
  );
};

export const TimePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const timeRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-60">
      <input
        ref={timeRef}
        id="time"
        name="time"
        type="time"
        className="w-full p-3 py-4 rounded-[12px] bg-white outline-[#6784F6]"
        placeholder="2025-08-17 16:34"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Clock
        onClick={() => timeRef.current?.showPicker()}
        className="w-5 absolute right-3 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
