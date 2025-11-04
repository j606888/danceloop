"use client";

import { useGetUserVideosQuery } from "@/store/slices/user/videos";
import { Video } from "@/store/slices/videos";
import VideoCard from "./VideoCard";
import Searchbar from "./Searchbar";
import { useReducer } from "react";
import { BeatLoader } from "react-spinners";
import {
  filterDraftReducer,
  bindSetField,
  initialFilterDraft,
} from "./Searchbar/filterDraft";
import ActiveFilters from "./ActiveFilters";
import VideoListSkeleton from "@/components/skeletons/VideoListSkeleton";

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
      <div className="sticky top-[56px] p-2.5 bg-[#F1F1F1] flex flex-col gap-2.5 z-20">
        <Searchbar setField={setField} filters={filters} />
        <ActiveFilters filters={filters} setField={setField} />
      </div>
      <div className="p-2.5">
        {isLoading ? (
         <>
          <VideoListSkeleton />
          <VideoListSkeleton />
          <VideoListSkeleton />
          <VideoListSkeleton />
         </>
        ) : (
          <div className="flex flex-col gap-1">
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
