import { useState, useMemo } from "react";
import { BeatLoader } from "react-spinners";
import { useGetDancersQuery } from "@/store/slices/dancers";
import { Stepper, Footer } from "../shared";
import DancerList from "./DancerList";
import TagInput from "./TagInput";
import useScroll from "@/hooks/useScroll";
import NewDancerBtn from "./NewDancerBtn";
import NewDancerForm from "./NewDancerForm";
import { VideoDraft } from "../videoDraft";

const Step2 = ({
  preview,
  draft,
  setField,
  onNext,
  onBack,
  progress,
  status,
}: {
  preview: string | null;
  draft: VideoDraft;
  setField: <K extends keyof VideoDraft>(k: K) => (v: VideoDraft[K]) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
  status: "idle" | "ready" | "uploading" | "success" | "error";
}) => {
  const [newDancerOpen, setNewDancerOpen] = useState(false);
  const [newDancerDefaultName, setNewDancerDefaultName] = useState("");
  const [keyword, setKeyword] = useState("");
  const { isScrolled, containerRef } = useScroll();
  const { data: dancers, isLoading: isLoadingDancers } = useGetDancersQuery();

  const selectedDancers = useMemo(() => {
    return draft.dancerIds
      .map((id) => dancers?.find((dancer) => dancer.id === id))
      .filter((dancer) => dancer !== undefined);
  }, [dancers, draft.dancerIds]);

  const filteredDancers = useMemo(
    () =>
      dancers
        ?.filter((dancer) =>
          dancer.name.toLowerCase().includes(keyword.toLowerCase())
        )
        ?.filter((dancer) => !draft.dancerIds.includes(dancer.id)),
    [dancers, keyword, draft.dancerIds]
  );

  const handleSelectDancer = (dancerId: number) => {
    setKeyword("");
    if (draft.dancerIds.includes(dancerId)) {
      setField("dancerIds")(draft.dancerIds.filter((id) => id !== dancerId));
    } else {
      setField("dancerIds")([...draft.dancerIds, dancerId]);
    }
  };

  const handleRemove = (dancerId: number) => {
    setField("dancerIds")(draft.dancerIds.filter((id) => id !== dancerId));
  };

  const handleNewDancerButtonClick = () => {
    setNewDancerDefaultName(keyword);
    setNewDancerOpen(true);
    setKeyword("");
  };

  return (
    <div>
      <Stepper step={2} title="參與舞者" preview={preview} />
      <div
        className="fixed top-[125px] left-0 right-0 bottom-[61px] overflow-y-auto"
        ref={containerRef}
      >
        <div
          className={`sticky top-0 p-3 transition-all duration-300 ${
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
        {isLoadingDancers && <div className="p-4"><BeatLoader color="#6784F6" /></div>}
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
      <Footer progress={progress} status={status} onNext={onNext} onBack={onBack} />
    </div>
  );
};

export default Step2;
