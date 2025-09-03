import { useEffect } from "react";
import { VideoDraft } from "../videoDraft";

const Step0 = ({
  file,
  draft,
  onNext,
  setField,
  onSelect,
}: {
  file: File | null;
  mediaId: string | null;
  draft: VideoDraft;
  onNext: () => void;
  setField: <K extends keyof VideoDraft>(k: K) => (v: VideoDraft[K]) => void;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  useEffect(() => {
    if (file && !draft.title) {
      setField("title")(file.name || "");
      onNext();
    }
  }, [file, setField, draft.title, onNext]);

  return (
    <div className="absolute top-[56px] left-0 right-0 bottom-0 flex flex-col items-center justify-center ">
      <img
        src="/icons/rounded-upload.svg"
        alt="Rounded Upload"
        className="mb-5"
      />
      <h3 className="font-semibold mb-1">選擇要上傳的影片</h3>
      <p className="text-sm text-[#444444] mb-5">
        在選擇公開前你的影片都會是私人狀態
      </p>
      <div>
        <label
          htmlFor="upload-file"
          className="bg-[#6784F6] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
        >
          選取檔案
        </label>
        <input
          id="upload-file"
          type="file"
          accept="video/*"
          name="選擇檔案"
          onChange={onSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Step0;
