import { useGetDancersQuery } from "@/store/slices/dancers";
import { Venus, Mars, X } from "lucide-react";

const SelectedDancer = ({
  selectedDancerIds,
  onRemove,
}: {
  selectedDancerIds: number[];
  onRemove: (dancerId: number) => void;
}) => {
  const { data: dancers } = useGetDancersQuery();
  const selectedDancers = dancers?.filter((dancer) =>
    selectedDancerIds.includes(dancer.id)
  );

  return (
    <div className="flex flex-wrap gap-3 p-2 bg-[#F8F8F8] rounded-[4px] w-full mb-3">
      {selectedDancers?.map((dancer) => (
        <div
          key={dancer.id}
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
          <X
            className="w-4 h-4 cursor-pointer text-[#777777]"
            onClick={() => onRemove(dancer.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectedDancer;
