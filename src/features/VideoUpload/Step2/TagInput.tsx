import { useRef } from "react";
import { DancerBadge } from "@/components/GendarItem";
import { Dancer } from "@/store/slices/dancers";

const TagInput = ({
  selectedDancers,
  onRemove,
  keyword,
  setKeyword,
}: {
  selectedDancers: Dancer[];
  onRemove: (dancerId: number) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex flex-wrap items-center gap-3 p-2 rounded-[4px] border-1 border-[#E5E5E5] min-h-[48px] bg-white"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          inputRef.current?.focus();
        }
      }}
    >
      {selectedDancers?.map((dancer) => (
        <DancerBadge key={dancer.id} dancer={dancer} onRemove={onRemove} />
      ))}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className={`text-[#232323] outline-none ${
          selectedDancers?.length === 0 ? "w-full" : "w-[104px]"
        }`}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default TagInput;
