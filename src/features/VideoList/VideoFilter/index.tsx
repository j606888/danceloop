import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import RadioGroup from "./RadioGroup";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AppsIcon from "@mui/icons-material/Apps";
import DancersInput from "./DancersInput";

const DANCE_STYLES = ["Bachata", "Salsa", "Zouk"];
const RECORD_TYPES = ["Party", "Course", "Workshop", "Other"];

const VideoFilter = ({
  filters,
  setFilters,
  viewType,
  setViewType,
}: {
  filters: { title: string; dancerIds: number[]; danceStyle: string; recordType: string };
  setFilters: (filters: {
    title: string;
    dancerIds: number[];
    danceStyle: string;
    recordType: string;
  }) => void;
  viewType: "list" | "grid";
  setViewType: (viewType: "list" | "grid") => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const filtersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="sticky top-[56px] z-10 bg-white flex gap-2 items-center p-2">
      <div className="relative rounded-full bg-[#EFC22F] p-2 flex items-center gap-2  cursor-pointer">
        <FilterAltOutlinedIcon
          onClick={() => setIsOpen(!isOpen)}
          className="text-white"
        />
        {filtersCount > 0 && (
          <div className="absolute -top-1.5 -right-1.5 text-white text-xs font-bold bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center">
            {filtersCount}
          </div>
        )}
      </div>
      <div className="rounded-full bg-[#EFC22F] p-2 flex items-center gap-2  cursor-pointer">
        {viewType === "grid" ? (
          <FormatListBulletedIcon
            onClick={() => setViewType("list")}
            className="text-white"
          />
        ) : (
          <AppsIcon
            onClick={() => setViewType("grid")}
            className="text-white"
          />
        )}
      </div>
      <Drawer anchor="bottom" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4 flex flex-col gap-4">
          <h3 className="text-lg font-bold mb-4">篩選</h3>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Video Title</label>
            <input
              type="text"
              placeholder="Bachata Lv2 / Lesson 3 / Head movement"
              className="p-3 rounded-[4px] bg-white outline-[#6784F6] border-1 border-[#E5E5E5]"
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            />
          </div>
          <DancersInput
            dancerIds={filters.dancerIds}
            setDancerIds={(dancerIds) => setFilters({ ...filters, dancerIds })}
          />
          <RadioGroup
            label="Dance Style"
            options={DANCE_STYLES}
            value={filters.danceStyle}
            onChange={(value) => setFilters({ ...filters, danceStyle: value })}
          />
          <RadioGroup
            label="Record Type"
            options={RECORD_TYPES}
            value={filters.recordType}
            onChange={(value) => setFilters({ ...filters, recordType: value })}
          />

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
                setFilters({ title: "", dancerIds: [], danceStyle: "", recordType: "" });
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
