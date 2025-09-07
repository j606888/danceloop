"use client";

import { useState } from "react";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistCard from "./PlaylistCard";
import { useGetUserPlaylistsQuery, PlaylistType } from "@/store/slices/user/playlists";

export type Tab = PlaylistType;

const PlaylistList = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mine");
  const { data: playlistsData } = useGetUserPlaylistsQuery({ type: activeTab });
  const playlists = playlistsData?.result || []

  return (
    <>
      <PlaylistHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="px-3">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </>
  );
};

export default PlaylistList;
