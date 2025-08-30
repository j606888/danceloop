import { Venus, Mars } from "lucide-react";
import { useState } from "react";
import { useCreateDancerMutation } from "@/store/slices/dancers";

const NewDancer = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [createDancer] = useCreateDancerMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name || !gender) return;

    await createDancer({ name, gender, isTeacher });
    onClose();
  };

  return (
    <div className="flex flex-col gap-3 border-1 border-[#E5E5E5] rounded-[4px] p-3 mb-4">
      <h4 className="text-center font-medium">New Dancer</h4>
      <div className="flex flex-col gap-1">
        <label className="text-[#444444] font-medium">Dancer Name</label>
        <input
          type="text"
          className="border-1 border-[#E5E5E5] rounded-[4px] p-2 outline-[#6784F6]"
          placeholder="Enter dancer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[#444444] font-medium">Gender</label>
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
            <span className="font-medium">Female</span>
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
            <span className="font-medium">Male</span>
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
        <label className="text-[#444444] font-medium" htmlFor="isTeacher">
          Is a teacher?
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
  );
};

export default NewDancer;
