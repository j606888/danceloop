import { X, Mars, Venus } from "lucide-react";
import { Dancer } from "@/store/slices/dancers";

export const DancerBadge = ({
  dancer,
  onRemove,
}: {
  dancer: Dancer;
  onRemove?: (dancerId: number) => void;
}) => {
  return (
    <div
      className={`flex gap-1.5 justify-center items-center px-2 h-[32px] rounded-full ${
        dancer.gender === "male" ? "bg-[#6784F6]/10" : "bg-[#DD886F]/10"
      }`}
    >
      {dancer.gender === "male" ? (
        <Mars className="w-4 h-4 text-[#6784F6]" />
      ) : (
        <Venus className="w-4 h-4 text-[#DD886F]" />
      )}
      <span
        className={`text-sm font-semibold whitespace-nowrap ${
          dancer.gender === "male" ? "text-[#6784F6]" : "text-[#DD886F]"
        }`}
      >
        {dancer.name}
      </span>
      {onRemove && (
        <X
          className="w-4 h-4 cursor-pointer text-[#777777]"
          onClick={() => onRemove(dancer.id)}
        />
      )}
    </div>
  );
};
