import { X, Mars, Venus } from "lucide-react";
import { Dancer } from "@/store/slices/dancers";

export const DancerBadge = ({
  size = 'base',
  dancer,
  onRemove,
  className,
}: {
  dancer: Dancer;
  size?: 'base' | 'sm';
  onRemove?: (dancerId: number) => void;
  className?: string;
}) => {
  return (
    <div
      className={`flex gap-1.5 justify-center items-center px-2 ${size === 'sm' ? 'h-[28px]' : 'h-[32px]'} rounded-full ${
        dancer.gender === "male" ? "bg-[#6784F6]/10" : "bg-[#DD886F]/10"
      } ${className}`}
    >
      {dancer.gender === "male" ? (
        <Mars className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} text-[#6784F6]`} />
      ) : (
        <Venus className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} text-[#DD886F]`} />
      )}
      <span
        className={`${size === 'base' ? 'text-sm' : 'text-xs'} font-semibold whitespace-nowrap ${
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
