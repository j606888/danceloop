import { useState, useReducer } from "react";
import { useGetVideosQuery } from "@/store/slices/videos";
import VideoPreview from "./VideoPreview";
import Searchbar from "./Searchbar";
import ActiveFilters from "./ActiveFilters";
import {
  filterDraftReducer,
  bindSetField,
  initialFilterDraft,
} from "./Searchbar/filterDraft";
import { PulseLoader } from "react-spinners";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

const VideoList = () => {
  const [filters, dispatch] = useReducer(
    filterDraftReducer,
    initialFilterDraft
  );
  const { data: videos, isLoading } = useGetVideosQuery(filters);
  const setField = bindSetField(dispatch);
  const [viewType, setViewType] = useState("list");
  useScrollRestoration("public-video-list");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={20} color="#4A81D9" />
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-[56px] p-2.5 bg-[#F1F1F1] flex flex-col gap-2.5 z-20">
        <Searchbar setField={setField} filters={filters} viewType={viewType} onViewTypeChange={setViewType} />
        <ActiveFilters filters={filters} setField={setField} />
      </div>
      <div
        className={`relative ${
          viewType === "grid"
            ? "grid grid-cols-3 gap-[3px]"
            : "py-1 flex flex-col gap-1"
        }`}
      >
        {videos?.result?.map((video) => (
          <VideoPreview key={video.uid} video={video} viewType={viewType} />
        ))}
      </div>
    </>
  );
};

export default VideoList;
