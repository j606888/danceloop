import { Visibility } from "@/lib/constants";
import { Link2, Earth, LockKeyhole } from "lucide-react";

const ICONS = {
  private: <LockKeyhole className="w-[15px] h-[15px] text-gray-400 " />,
  unlisted: <Link2 className="w-[15px] h-[15px] text-gray-400 " />,
  public: <Earth className="w-[15px] h-[15px] text-gray-400 " />,
}
const VisibilityChip = ({ visibility }: { visibility: Visibility }) => {
  const icon = ICONS[visibility as Visibility];
  
  return icon;
};

export default VisibilityChip;