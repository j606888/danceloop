"use client";

import { useState } from "react";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistCard from "./PlaylistCard";
import {
  useGetUserPlaylistsQuery,
  PlaylistType,
} from "@/store/slices/user/playlists";

export type Tab = PlaylistType;

const PlaylistList = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mine");
  const { data: playlistsData, isFetching } = useGetUserPlaylistsQuery({
    type: activeTab,
  });
  const playlists = playlistsData?.result || [];

  return (
    <>
      <PlaylistHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="px-3">
        {isFetching ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : playlists.length > 0 ? (
          playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center mt-12 gap-3">
            <img src="/icons/sad-box.svg" alt="sad box" className="w-1/2 mb-2" />
            <h4 className="text-lg font-medium">尚未有清單</h4>
            <p className="text-sm text-[#999999]">去探索探索別人的清單吧</p>
          </div>
        )}
      </div>
    </>
  );
};

const CardSkeleton = () => {
  return (
    <div className="flex items-center gap-3 pb-2 border-b border-[#F2F2F2] pt-2 last:border-b-0 animate-pulse">
      <div className="flex items-center justify-center w-16 h-16 rounded-[4px] bg-[#555555]/12" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-3 rounded bg-gray-200 w-20"></div>
        <div className="flex items-center gap-2 text-sm text-[#999999]">
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistList;
