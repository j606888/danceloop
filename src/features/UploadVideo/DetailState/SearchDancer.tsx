import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import NewDancer from "./NewDancer";
import SelectedDancer from "./SelectedDancer";
import DancerList from "./DancerList";

const SearchDancer = () => {
  const [open, setOpen] = useState(false);
  const [showNewDancer, setShowNewDancer] = useState(false);
  const [selectedDancerIds, setSelectedDancerIds] = useState<number[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const handleRemoveDancer = (dancerId: number) => {
    setSelectedDancerIds(selectedDancerIds.filter((id) => id !== dancerId));
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-[#444444] font-medium" htmlFor="Dancers">
          Dancers
        </label>
        <div className="flex items-center gap-2 h-[56px] px-3 bg-white rounded-[12px]">
          <span
            className="text-[#999999] text-sm"
            onClick={() => setOpen(true)}
          >
            Add more
          </span>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            ></motion.div>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl p-4 h-[85vh] overflow-y-auto"
            >
              <h2 className="text-lg font-bold w-full text-center mb-2">
                Dancers
              </h2>
              <SelectedDancer
                selectedDancerIds={selectedDancerIds}
                onRemove={handleRemoveDancer}
              />
              {showNewDancer ? (
                <NewDancer onClose={() => setShowNewDancer(false)} />
              ) : (
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
              )}
              <DancerList
                selectedDancerIds={selectedDancerIds}
                setSelectedDancerIds={setSelectedDancerIds}
                keyword={keyword}
              />
              <div className="absolute top-5 right-5">
                <X
                  className="w-5 h-5 cursor-pointer text-gray-600"
                  onClick={() => setOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchDancer;
