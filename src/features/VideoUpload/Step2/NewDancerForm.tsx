import { useState } from "react";
import { Venus, Mars } from "lucide-react";
import { useCreateDancerMutation } from "@/store/slices/dancers";

const NewDancerForm = ({ onClose, onSelect, defaultName }: { onClose: () => void, onSelect: (dancerId: number) => void, defaultName: string }) => {
  const [name, setName] = useState<string>(defaultName);
  const [gender, setGender] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [createDancer] = useCreateDancerMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name || !gender) return;

    const dancer = await createDancer({ name, gender, isTeacher }).unwrap();
    onSelect(dancer.id);
    onClose();
  };

  return (
    <div className="p-3 -mt-3">
      <div className="border-1 border-[#E5E5E5] rounded-[4px] p-3 flex flex-col gap-3">
        <h4 className="font-medium">新增舞者</h4>
        <div>
          <label className="block text-[#21212] text-sm font-medium mb-1">
            名稱
          </label>
          <input
            type="text"
            className="border-1 border-[#E5E5E5] rounded-[4px] p-2 outline-[#6784F6] w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
        <label className="block text-[#21212] text-sm font-medium mb-1">
            性別
          </label>
          <div className="flex gap-2">
            <div
              className={`flex items-center justify-center gap-1  rounded-[10px] px-3 py-2 w-full ${
                gender === "female"
                  ? "bg-[#DD886F] text-white"
                  : "bg-[#ECEEF4] text-[#424242]"
              }`}
              onClick={() => setGender("female")}
            >
              <Venus className="w-5 h-5" />
              <span className="font-medium">女森</span>
            </div>
            <div
              className={`flex items-center justify-center gap-1  rounded-[10px] px-3 py-2 w-full ${
                gender === "male"
                  ? "bg-[#6784F6] text-white"
                  : "bg-[#ECEEF4] text-[#424242]"
              }`}
              onClick={() => setGender("male")}
            >
              <Mars className="w-5 h-5" />
              <span className="font-medium">男森</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            id="isTeacher"
            checked={isTeacher}
            onChange={() => setIsTeacher(!isTeacher)}
          />
          <label className="text-[#232323] font-medium text-sm" htmlFor="isTeacher">
            是否為老師?
          </label>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className=" text-[#6784F6] border-1 border-[#6784F6] rounded-[10px] px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#6784F6] text-white rounded-[10px] px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!name || !gender}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDancerForm;
