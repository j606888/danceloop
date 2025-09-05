"use client";

import { useState } from "react";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistCard from "./PlaylistCard";
import { useGetUserPlaylistsQuery } from "@/store/slices/user/playlists";

export type Tab = "mine" | "followed" | "explore";
const PlaylistList = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mine");
  const { data: playlistsData } = useGetUserPlaylistsQuery();
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
