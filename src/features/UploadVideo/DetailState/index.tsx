import RadioGroup from "@/components/RadioGroup";
import UploadToast from "@/components/UploadToast";
import DancersInput from "./DancersInput";
import { useState } from "react";

const DetailState = ({
  uploadSuccess,
  uploadProgress,
}: {
  uploadSuccess: boolean;
  uploadProgress: number;
}) => {
  const [dancerIds, setDancerIds] = useState<number[]>([]);

  return (
    <div className="px-5 py-5 bg-[#F0F1F6]">
      <UploadToast
        uploadProgress={uploadProgress}
        uploadSuccess={uploadSuccess}
      />
      <h2 className="font-bold py-4">Video Details</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label
            className="text-[#444444] font-medium"
            htmlFor="videoTitle"
          >
            Video Title
          </label>
          <input
            type="text"
            className="p-3 py-4 rounded-[12px] bg-white outline-[#6784F6]"
            placeholder="Bachata Lv2 / Lesson 3 / Head movement"
          />
        </div>
        <DancersInput
          dancerIds={dancerIds}
          setDancerIds={setDancerIds}
        />
        <div className="flex flex-col gap-1">
          <label
            className="text-[#444444] font-medium"
            htmlFor="RecordAt"
          >
            Record at
          </label>
          <input
            type="text"
            className="p-3 py-4 rounded-[12px] bg-white outline-[#6784F6]"
            placeholder="2025-08-17 16:34"
          />
        </div>
        <RadioGroup
          label="Dance Style"
          options={["Bachata", "Salsa", "Zouk"]}
        />
        <RadioGroup
          label="Dance Type"
          options={["Party", "Course", "Workshop", "Other"]}
        />
        <div className="flex flex-col gap-1">
          <label
            className="text-[#444444] font-medium"
            htmlFor="Location"
          >
            Location (Optional)
          </label>
          <input
            type="text"
            className="p-3 rounded-[12px] bg-white outline-[#6784F6]"
            placeholder="Social Hub"
          />
        </div>
        <RadioGroup label="Visibility" options={["Public", "Private"]} />
        <button className="bg-[#6784F6] text-white p-3 rounded-[12px] font-medium">
          Submit
        </button>
      </div>
    </div>
  );
};

export default DetailState;
