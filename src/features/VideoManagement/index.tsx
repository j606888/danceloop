"use client";

import { useGetUserVideosQuery } from "@/store/slices/user/videos";
import { Video } from "@/store/slices/videos";
import VideoCard from "./VideoCard";
import Searchbar from "./Searchbar";
import { useReducer } from "react";
import {
  filterDraftReducer,
  bindSetField,
  initialFilterDraft,
} from "./filterDraft";
import ActiveFilters from "./ActiveFilters";

const VideoManagement = () => {
  const [filters, dispatch] = useReducer(
    filterDraftReducer,
    initialFilterDraft
  );
  const { data, isLoading } = useGetUserVideosQuery(filters);
  const videos = data?.result;
  const setField = bindSetField(dispatch);

  return (
    <>
      <div className="sticky top-[56px] p-2.5 bg-[#F1F1F1] flex flex-col gap-2.5">
        <Searchbar setField={setField} filters={filters} />
        <ActiveFilters filters={filters} setField={setField} />
      </div>
      <div className="p-2.5">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <div>
            {videos?.map((video: Video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VideoManagement;
