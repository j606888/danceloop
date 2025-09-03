import { Stepper, Footer } from "../shared";
import { useEffect, useState, useRef, useMemo } from "react";
import { useGetDancersQuery } from "@/store/slices/dancers";
import DancerList from "./DancerList";
import TagInput from "./TagInput";
import useScroll from "./useScroll";

const Step2 = ({
  onNext,
  progress,
}: {
  onNext: () => void;
  progress: number;
}) => {
  const { isScrolled, containerRef } = useScroll();
  const [selectedDancerIds, setSelectedDancerIds] = useState<number[]>([]);
  const { data: dancers } = useGetDancersQuery();
  const selectedDancers = dancers?.filter((dancer) =>
    selectedDancerIds.includes(dancer.id)
  );
  const [keyword, setKeyword] = useState("");

  const filteredDancers = useMemo(
    () =>
      dancers
        ?.filter((dancer) =>
          dancer.name.toLowerCase().includes(keyword.toLowerCase())
        )
        ?.filter((dancer) => !selectedDancerIds.includes(dancer.id)),
    [dancers, keyword, selectedDancerIds]
  );

  const handleSelectDancer = (dancerId: number) => {
    setKeyword("");
    if (selectedDancerIds.includes(dancerId)) {
      setSelectedDancerIds(selectedDancerIds.filter((id) => id !== dancerId));
    } else {
      setSelectedDancerIds([...selectedDancerIds, dancerId]);
    }
  };

  const onRemove = (dancerId: number) => {
    setSelectedDancerIds(selectedDancerIds.filter((id) => id !== dancerId));
  };

  return (
    <div>
      <Stepper step={2} title="參與舞者" preview={null} />
      <div
        className="fixed top-[125px] left-0 right-0 bottom-[61px] overflow-y-auto"
        ref={containerRef}
      >
        <div
          className={`sticky top-0 p-3  ${
            isScrolled ? "bg-gray-100 border-b border-[#e5e5e5]" : "bg-white"
          }`}
        >
          <TagInput
            selectedDancers={selectedDancers || []}
            onRemove={onRemove}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </div>
        <DancerList dancers={filteredDancers || []} onClick={handleSelectDancer} />
      </div>
      <Footer progress={progress} onNext={onNext} />
    </div>
  );
};

export default Step2;
