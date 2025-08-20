import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useGetDancersQuery } from "@/store/slices/dancers";
import { Button } from "@mui/material";

const DANCE_STYLES = ["Bachata", "Salsa", "Zouk"];

const VideoFilter = ({
  filters,
  setFilters,
}: {
  filters: { dancer: string; danceStyle: string };
  setFilters: (filters: { dancer: string; danceStyle: string }) => void;
}) => {
  const { data: dancers } = useGetDancersQuery();
  const [isOpen, setIsOpen] = useState(false);

  const filtersCount = Object.values(filters).filter(Boolean).length;

  const handleDancerClick = (dancer: string) => {
    setFilters({ ...filters, dancer });
  };

  const handleDanceStyleClick = (danceStyle: string) => {
    setFilters({ ...filters, danceStyle });
  };

  return (
    <div className="fixed bottom-5 left-5 rounded-full bg-gray-400 p-2 flex items-center gap-2 z-10 cursor-pointer">
      <FilterAltOutlinedIcon
        onClick={() => setIsOpen(!isOpen)}
        className="text-white"
      />
      {filtersCount > 0 && (
        <div className="absolute -top-1.5 -right-1.5 text-white text-xs font-bold bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center">
          {filtersCount}
        </div>
      )}
      <Drawer anchor="bottom" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4 flex flex-col gap-4">
          <h3 className="text-lg font-bold mb-4">篩選</h3>
          <div className="flex flex-col gap-1">
            <label>Dancers</label>
            <div className="flex flex-wrap gap-3">
              {dancers?.map((dancer) => (
                <div
                  key={dancer}
                  className={`px-3 py-1.5 rounded-md  cursor-pointer ${
                    filters.dancer === dancer
                      ? "bg-amber-600 text-white"
                      : "border border-gray-200"
                  }`}
                  onClick={() => handleDancerClick(dancer)}
                >
                  {dancer}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label>Dance Style</label>
            <div className="flex flex-wrap gap-3">
              {DANCE_STYLES.map((danceStyle) => (
                <div
                  key={danceStyle}
                  className={`px-3 py-1.5 rounded-md  cursor-pointer ${
                    filters.danceStyle === danceStyle
                      ? "bg-amber-600 text-white"
                      : "border border-gray-200"
                  }`}
                  onClick={() => handleDanceStyleClick(danceStyle)}
                >
                  {danceStyle}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex justify-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setFilters({ dancer: "", danceStyle: "" });
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default VideoFilter;
