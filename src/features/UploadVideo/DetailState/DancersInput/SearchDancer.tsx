import { Plus, X } from "lucide-react";

const SearchDancer = ({
  keyword,
  setKeyword,
  setShowNewDancer,
}: {
  keyword: string;
  setKeyword: (keyword: string) => void;
  setShowNewDancer: (showNewDancer: boolean) => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 border-1 border-[#E5E5E5] rounded-[4px] mb-4">
      <input
        type="text"
        placeholder="Search Dancer"
        className="text-sm outline-none w-full"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keyword && (
        <>
          <div className="flex flex-shrink-0 justify-center items-center rounded-full w-5 h-5 bg-[#F2F2F2]">
            <X
              className="w-3.5 h-3.5 cursor-pointer text-[#777777]"
              onClick={() => setKeyword("")}
            />
          </div>
          <div className="w-[1px] h-5 bg-[#cccccc]" />
        </>
      )}
      <div
        className="flex gap-1 items-center text-[#444444] cursor-pointer flex-1"
        onClick={() => setShowNewDancer(true)}
      >
        <Plus className="w-4 h-4" />
        <span className="whitespace-nowrap text-xs font-medium">
          New Dancer
        </span>
      </div>
    </div>
  );
};

export default SearchDancer;
