import { Plus } from "lucide-react";

const NewDancerBtn = ({
  onClick,
  name,
}: {
  onClick: () => void;
  name: string;
}) => {
  return (
    <div className="px-6">
      <div className="flex items-center gap-2" onClick={onClick}>
        <div className="bg-[#E8E8EA] rounded-full w-8 h-8 flex justify-center items-center">
          <Plus className="w-5 h-5 text-[#555555]" />
        </div>
        <span>新增舞者 - {name}</span>
      </div>
    </div>
  );
};

export default NewDancerBtn;
