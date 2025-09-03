import { useState } from "react";
import { Footer, Stepper } from "../shared";
import { VideoDraft, Visibility } from "../videoDraft";

const PRIVACY_OPTIONS = [
  {
    label: "私人",
    value: "private",
    description: "只有你自己和你選擇的對象可以觀看你的影片",
  },
  {
    label: "不公開",
    value: "unlisted",
    description: "知道影片連結的人都能觀看你的影片",
  },
  {
    label: "公開",
    value: "public",
    description: "所有人都能觀看你的影片",
  },
];

const Step3 = ({
  progress,
  draft,
  setField,
  onBack,
  onNext,
}: {
  progress: number;
  draft: VideoDraft;
  setField: <K extends keyof VideoDraft>(k: K) => (v: VideoDraft[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) => {
  return (
    <>
      <Stepper step={3} title="瀏覽權限" preview={null} />
      <div className="px-5 py-3">
        <div className="mb-3">
          <label className="block text-[#21212] text-sm font-medium ">
            儲存或發佈
          </label>
          <p className="text-[13px] text-[#777777] mb-2">你之後可以隨時更改影片權限</p>
        </div>
        <div className="flex flex-col gap-3">
          {PRIVACY_OPTIONS.map((option) => (
            <div
              key={option.value}
              onClick={() => setField("visibility")(option.value as Visibility)}
              className={`px-4 py-4 border-1  rounded-md flex items-center gap-3 cursor-pointer ${draft.visibility === option.value ? "bg-[#6784F6]/5 border-[#6784F6]" : "border-[#E5E5E5]"}`}
            >
              <div className={`w-4.5 h-4.5 bg-white rounded-full ${draft.visibility === option.value ? "border-5 border-[#6784F6]" : "border-1 border-[#D5D5D5]"}`} />
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-medium">{option.label}</span>
                <span className="text-[13px] text-[#777777]">{option.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer
        progress={progress}
        onBack={onBack}
        onNext={onNext}
        onNextText="儲存"
        onNextDisabled={progress !== 100}
      />
    </>
  );
};

export default Step3;
