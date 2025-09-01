import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetDancersQuery } from "@/store/slices/dancers";
import { DancerBadge } from "@/components/GendarItem";
import NewDancer from "./NewDancer";
import SelectedDancer from "./SelectedDancer";
import DancerList from "./DancerList";
import Drawer from "./Drawer";
import SearchDancer from "./SearchDancer";

const DancersInput = ({
  dancerIds,
  setDancerIds,
}: {
  dancerIds: number[];
  setDancerIds: (dancerIds: number[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [showNewDancer, setShowNewDancer] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const { data: dancers } = useGetDancersQuery();
  const selectedDancers = dancers?.filter((dancer) =>
    dancerIds.includes(dancer.id)
  );

  const handleRemoveDancer = (dancerId: number) => {
    setDancerIds(dancerIds.filter((id) => id !== dancerId));
  };

  const handleRemoveAll = () => {
    setDancerIds([]);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-[#444444] font-medium" htmlFor="Dancers">
          Dancers
        </label>
        <div
          className="flex flex-wrap items-center gap-2 p-2 bg-white rounded-[12px] min-h-[48px]"
          onClick={() => setOpen(true)}
        >
          {selectedDancers?.map((dancer) => (
            <DancerBadge key={dancer.id} dancer={dancer} />
          ))}
        </div>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <SelectedDancer
          selectedDancerIds={dancerIds}
          onRemove={handleRemoveDancer}
          onRemoveAll={handleRemoveAll}
        />
        <AnimatePresence mode="wait" >
          {showNewDancer ? (
            <motion.div
            key="new-dancer"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <NewDancer onClose={() => setShowNewDancer(false)} />
          </motion.div>
          ) : (
            <motion.div
            key="search-dancer"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <SearchDancer
              keyword={keyword}
              setKeyword={setKeyword}
              setShowNewDancer={() => setShowNewDancer(true)}
            />
          </motion.div>
          )}
        </AnimatePresence>
        <DancerList
          selectedDancerIds={dancerIds}
          setSelectedDancerIds={setDancerIds}
          keyword={keyword}
        />
      </Drawer>
    </>
  );
};

export default DancersInput;
