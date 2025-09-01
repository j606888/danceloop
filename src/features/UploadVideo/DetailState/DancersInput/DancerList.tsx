import RoundCheck from "@/components/RoundCheck";
import { useGetDancersQuery } from "@/store/slices/dancers";
import { Venus, Mars } from "lucide-react";

const DancerList = ({
  selectedDancerIds,
  setSelectedDancerIds,
  keyword,
}: {
  selectedDancerIds: number[];
  setSelectedDancerIds: (dancerIds: number[]) => void;
  keyword: string;
}) => {
  const { data: dancers } = useGetDancersQuery();

  const filteredDancers = dancers?.filter((dancer) =>
    dancer.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleSelectDancer = (dancerId: number) => {
    if (selectedDancerIds.includes(dancerId)) {
      setSelectedDancerIds(selectedDancerIds.filter((id) => id !== dancerId));
    } else {
      setSelectedDancerIds([...selectedDancerIds, dancerId]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-medium">全部</h4>
      <div className="flex flex-col">
        {filteredDancers?.map((dancer) => (
          <div
            key={dancer.id}
            className="flex justify-between items-center px-2 py-2 border-b-1 border-[#F2F2F2] last:border-b-0"
            onClick={() => handleSelectDancer(dancer.id)}
          >
            <div className="flex items-center gap-3">
              <GenderIcon gender={dancer.gender} />
              <span className="text-sm ">{dancer.name}</span>
              {dancer.isTeacher && <span className="text-xs bg-[#EFC22F]/20 text-[#B88E08] rounded-[10px] px-2 py-1 ">Teacher</span>}
            </div>
            <RoundCheck checked={selectedDancerIds.includes(dancer.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

const GenderIcon = ({ gender }: { gender: string }) => {
  if (gender === "male") {
    return (
      <div className="flex justify-center items-center w-8 h-8 rounded-full bg-[#6784F6]/15">
        <Mars className="w-5 h-5 text-[#6784F6]" />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center w-8 h-8 rounded-full bg-[#DD886F]/15">
        <Venus className="w-5 h-5 text-[#DD886F]" />
      </div>
    );
  }
};

export default DancerList;
