import { FilterDraft } from "./Searchbar/filterDraft";
import { Type, X } from "lucide-react";
import { DANCE_STYLES, RECORD_TYPES } from "@/lib/constants";
import { useGetDancersQuery } from "@/store/slices/dancers";

const ActiveFilters = ({
  filters,
  setField,
}: {
  filters: FilterDraft;
  setField: <K extends keyof FilterDraft>(
    field: K
  ) => (value: FilterDraft[K]) => void;
}) => {
  const { data: dancers } = useGetDancersQuery();

  const showFilter =
    filters.title ||
    filters.danceStyle ||
    filters.recordType ||
    filters.dancerIds.length > 0;
  const danceStyle = DANCE_STYLES.find(
    (style) => style.value === filters.danceStyle
  );
  const recordType = RECORD_TYPES.find(
    (type) => type.value === filters.recordType
  );
  const selectedDancers = filters.dancerIds
    .map((id) => dancers?.find((dancer) => dancer.id === id))
    .filter((dancer) => dancer !== undefined);

  if (!showFilter) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.title && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white">
          <div className="flex items-center gap-1">
            <Type className="w-[14px] h-[14px]" />
            <span className="text-sm font-medium">{filters.title}</span>
          </div>
          <X
            className="w-[14px] h-[14px]"
            onClick={() => setField("title")("")}
          />
        </div>
      )}
      {danceStyle && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white">
          <span className="text-sm font-medium">{danceStyle.label}</span>
          <X
            className="w-[14px] h-[14px]"
            onClick={() => setField("danceStyle")("")}
          />
        </div>
      )}
      {recordType && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white">
          <span className="text-sm font-medium">{recordType.label}</span>
          <X
            className="w-[14px] h-[14px]"
            onClick={() => setField("recordType")("")}
          />
        </div>
      )}
      {selectedDancers.length > 0 &&
        selectedDancers.map((dancer) => (
          <div
            key={dancer.id}
            className="flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white"
          >
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{dancer?.name}</span>
            </div>
            <X
              className="w-[14px] h-[14px]"
              onClick={() =>
                setField("dancerIds")(
                  filters.dancerIds.filter((id) => id !== dancer.id)
                )
              }
            />
          </div>
        ))}
    </div>
  );
};

export default ActiveFilters;
