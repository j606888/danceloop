import { useState, useRef } from "react";
import { useGetDancersQuery } from "@/store/slices/dancers";
import { DancerBadge } from "@/components/GendarItem";
import DancerList from "./DancerList";
import Drawer from "./Drawer";

const DancersInput = ({
  dancerIds,
  setDancerIds,
}: {
  dancerIds: number[];
  setDancerIds: (dancerIds: number[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");
  const { data: dancers } = useGetDancersQuery();
  const selectedDancers = dancers?.filter((dancer) =>
    dancerIds.includes(dancer.id)
  );

  const handleRemoveDancer = (dancerId: number) => {
    setDancerIds(dancerIds.filter((id) => id !== dancerId));
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-[#444444] font-medium" htmlFor="Dancers">
          Dancers
        </label>
        <div
          className={`flex flex-wrap items-center gap-2 p-2 bg-white min-h-[48px] border-1 border-[#E5E5E5] rounded-[4px]`}
          onClick={() => setOpen(true)}
        >
          {selectedDancers?.map((dancer) => (
            <DancerBadge key={dancer.id} dancer={dancer} />
          ))}
        </div>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div 
          className="flex flex-wrap items-center gap-2 p-2 bg-[#F8F8F8] rounded-[4px] w-full mb-3 min-h-[48px]"
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              inputRef.current?.focus();
            }
          }}
        >
          {selectedDancers?.map((dancer) => (
            <DancerBadge
              key={dancer.id}
              dancer={dancer}
              onRemove={handleRemoveDancer}
            />
          ))}
          <input
            ref={inputRef}
            type="text"
            placeholder={selectedDancers?.length === 0 ? "Search Dancer" : ""}
            className={`outline-none ${
              selectedDancers?.length === 0 ? "w-full" : "w-[104px]"
            }`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <DancerList
          selectedDancerIds={dancerIds}
          setSelectedDancerIds={(dancerIds) => {
            setDancerIds(dancerIds);
            setKeyword("");
          }}
          keyword={keyword}
        />
      </Drawer>
    </>
  );
};

export default DancersInput;
