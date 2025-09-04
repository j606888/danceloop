import { Search, Grid3X3, LayoutList } from "lucide-react";
import { DancerBadge } from "@/components/GendarItem";
import {
  DANCE_STYLES,
  RECORD_TYPES,
  DanceStyle,
  RecordType,
} from "@/lib/constants";
import { useGetDancersQuery } from "@/store/slices/dancers";
import { useFocus } from "./useFocus";
import { FilterDraft } from "./filterDraft";

const Searchbar = ({
  setField,
  filters,
  viewType,
  onViewTypeChange,
}: {
  setField: <K extends keyof FilterDraft>(
    field: K
  ) => (value: FilterDraft[K]) => void;
  filters: FilterDraft;
  viewType: "list" | "grid";
  onViewTypeChange: (viewType: "list" | "grid") => void;
}) => {
  const {
    inputRef,
    rootRef,
    handleKeyDown,
    handleFocus,
    handleChange,
    open,
    search,
    q,
    clearSearch,
  } = useFocus();
  const { data: dancers } = useGetDancersQuery();
  const danceStyle = q
    ? DANCE_STYLES.find((s) => s.value.toLowerCase().includes(q))
    : null;
  const danceType = q
    ? RECORD_TYPES.find((t) => t.value.toLowerCase().includes(q))
    : null;
  const dancerHints = q
    ? dancers?.filter((d) => d.name.toLowerCase().includes(q)).slice(0, 3)
    : [];

  return (
    <div
      ref={rootRef}
      className={`relative flex flex-col bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] ${
        open ? "rounded-t-[10px]" : "rounded-[10px]"
      }`}
    >
      <div
        className={`flex items-center justify-between pl-4 pr-2 h-[45px] ${
          open ? "border-b border-[#F2F2F2]" : ""
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 w-full">
          <Search className="w-4 h-4 text-[#454545]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="rounded-[10px] bg-[#EFC22F] p-2 flex items-center cursor-pointer">
        {viewType === "grid" ? (
          <LayoutList
            onClick={() => onViewTypeChange("list")}
            className="text-white w-4 h-4"
          />
        ) : (
          <Grid3X3
            onClick={() => onViewTypeChange("grid")}
            className="text-white w-4 h-4"
          />
        )}
      </div>
      </div>

      {open && q && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[45px] bg-white rounded-b-[10px] py-2 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)]"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div
            className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#545454]"
            onClick={() => {
              setField("title")(search);
              clearSearch();
            }}
          >
            <Search className="w-[14px] h-[14px]" />
            <p>
              搜尋<b>標題</b>含有 {search}
            </p>
          </div>

          {danceStyle && (
            <div
              className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#545454]"
              onClick={() => {
                setField("danceStyle")(danceStyle.value as DanceStyle);
                clearSearch();
              }}
            >
              <Search className="w-[14px] h-[14px]" />
              <p>
                加入<b>舞種</b>篩選 {danceStyle.label}
              </p>
            </div>
          )}

          {danceType && (
            <div
              className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#545454]"
              onClick={() => {
                setField("recordType")(danceType.value as RecordType);
                clearSearch();
              }}
            >
              <Search className="w-[14px] h-[14px]" />
              <p>
                加入<b>類別</b>篩選 {danceType.label}
              </p>
            </div>
          )}

          {dancerHints?.map((dancer) => (
            <div
              key={dancer.id}
              className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#545454] max-h-[40px]"
              onClick={() => {
                setField("dancerIds")([...filters.dancerIds, dancer.id]);
                clearSearch();
              }}
            >
              <Search className="w-[14px] h-[14px]" />
              <div>
                加入<b>舞者</b>篩選{" "}
                <DancerBadge
                  size="sm"
                  dancer={dancer}
                  className="inline-flex ml-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
