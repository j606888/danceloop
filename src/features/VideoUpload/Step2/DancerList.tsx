import { Dancer } from "@/store/slices/dancers";
import { Venus, Mars } from "lucide-react";

const DancerList = ({
  dancers,
  onClick,
}: {
  dancers: Dancer[];
  onClick: (dancerId: number) => void;
}) => {
  return (
    <div className="px-4 py-3 bg-white flex flex-col">
      {dancers?.map((dancer) => (
        <div
          key={dancer.id}
          className="flex justify-between items-center px-2 py-2 border-b-1 border-[#F2F2F2] last:border-b-0"
          onClick={() => onClick(dancer.id)}
        >
          <div className="flex items-center gap-3">
            <GenderIcon gender={dancer.gender} />
            <span className="text-sm ">{dancer.name}</span>
            {dancer.isTeacher && (
              <span className="text-xs bg-[#EFC22F]/20 text-[#B88E08] rounded-[10px] px-2 py-1 ">
                Teacher
              </span>
            )}
          </div>
        </div>
      ))}
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
