import { useState, useMemo } from "react";
import { useGetDancersQuery } from "@/store/slices/dancers";
import { Stepper, Footer } from "../shared";
import DancerList from "./DancerList";
import TagInput from "./TagInput";
import useScroll from "./useScroll";
import NewDancerBtn from "./NewDancerBtn";
import NewDancerForm from "./NewDancerForm";

const Step2 = ({
  onNext,
  onBack,
  progress,
}: {
  onNext: () => void;
  onBack: () => void;
  progress: number;
}) => {
  const [selectedDancerIds, setSelectedDancerIds] = useState<number[]>([]);
  const [newDancerOpen, setNewDancerOpen] = useState(false);
  const [newDancerDefaultName, setNewDancerDefaultName] = useState("");
  const [keyword, setKeyword] = useState("");
  const { isScrolled, containerRef } = useScroll();
  const { data: dancers } = useGetDancersQuery();

  const selectedDancers = useMemo(() => {
    return selectedDancerIds
      .map((id) => dancers?.find((dancer) => dancer.id === id))
      .filter((dancer) => dancer !== undefined);
  }, [dancers, selectedDancerIds]);

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

  const handleRemove = (dancerId: number) => {
    setSelectedDancerIds(selectedDancerIds.filter((id) => id !== dancerId));
  };

  const handleNewDancerButtonClick = () => {
    setNewDancerDefaultName(keyword);
    setNewDancerOpen(true);
    setKeyword("");
  };

  return (
    <div>
      <Stepper step={2} title="參與舞者" preview={null} />
      <div
        className="fixed top-[125px] left-0 right-0 bottom-[61px] overflow-y-auto"
        ref={containerRef}
      >
        <div
          className={`sticky top-0 p-3 ${
            isScrolled ? "bg-gray-100 border-b border-[#e5e5e5]" : "bg-white"
          }`}
        >
          <TagInput
            selectedDancers={selectedDancers}
            onRemove={handleRemove}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </div>
        {newDancerOpen && (
          <NewDancerForm
            defaultName={newDancerDefaultName}
            onClose={() => setNewDancerOpen(false)}
            onSelect={handleSelectDancer}
          />
        )}
        {!newDancerOpen && filteredDancers && filteredDancers.length > 0 && (
          <DancerList dancers={filteredDancers} onClick={handleSelectDancer} />
        )}
        {!newDancerOpen && keyword && (
          <NewDancerBtn onClick={handleNewDancerButtonClick} name={keyword} />
        )}
      </div>
      <Footer progress={progress} onNext={onNext} onBack={onBack} />
    </div>
  );
};

export default Step2;
