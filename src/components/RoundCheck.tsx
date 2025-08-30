import { Check } from "lucide-react";

const RoundCheck = ({ checked, onClick }: { checked: boolean, onClick?: () => void }) => {
  if (checked) {
    return (
      <div className="w-6 h-6 rounded-full bg-[#55BD95] flex items-center justify-center" onClick={onClick}>
        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
      </div>
    );
  } else {
    return (
      <div className="w-6 h-6 rounded-full border-1 border-[#D9D9D9] flex items-center justify-center" onClick={onClick}></div>
    );
  }
};

export default RoundCheck;
