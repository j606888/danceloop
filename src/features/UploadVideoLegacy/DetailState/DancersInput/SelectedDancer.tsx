import { useGetDancersQuery } from "@/store/slices/dancers";
import { Venus, Mars, X } from "lucide-react";
import { DancerBadge } from "@/components/GendarItem";

const SelectedDancer = ({
  selectedDancerIds,
  onRemove,
  onRemoveAll,
}: {
  selectedDancerIds: number[];
  onRemove: (dancerId: number) => void;
  onRemoveAll: () => void;
}) => {
  const { data: dancers } = useGetDancersQuery();
  const selectedDancers = dancers?.filter((dancer) =>
    selectedDancerIds.includes(dancer.id)
  );

  return (
    <div className="flex flex-wrap items-center gap-3 p-2 bg-[#F8F8F8] rounded-[4px] w-full mb-3 min-h-[48px]">
      {selectedDancers?.map((dancer) => (
        <DancerBadge key={dancer.id} dancer={dancer} onRemove={onRemove} />
      ))}
      {selectedDancerIds.length > 0 && (
        <p
          className="text-sm text-[#777777] px-2 cursor-pointer underline"
          onClick={() => onRemoveAll()}
        >
          Clear all
        </p>
      )}
    </div>
  );
};

export default SelectedDancer;
