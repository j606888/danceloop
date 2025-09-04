import { VISIBILITY_LABELS } from "@/lib/constants";
import { Visibility } from "@/lib/constants";
import { Link2, Earth, LockKeyhole } from "lucide-react";

const ICONS = {
  private: <LockKeyhole className="w-[12px] h-[12px] text-white" />,
  unlisted: <Link2 className="w-[14px] h-[14px] text-white" />,
  public: <Earth className="w-[12px] h-[12px] text-white" />,
}
const VisibilityChip = ({ visibility }: { visibility: Visibility }) => {
  const icon = ICONS[visibility as Visibility];
  
  return (
    <div className="inline-flex items-center gap-1 px-[6px] py-[2px] rounded-[12px] bg-[#EFC22F] text-white">
      {icon}
      <span className="text-[10px]">{VISIBILITY_LABELS[visibility as Visibility]}</span>
    </div>
  );
};

export default VisibilityChip;