"use client";

import { useState } from "react";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistCard from "./PlaylistCard";

export type Tab = "mine" | "followed" | "explore";
const PlaylistList = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mine");

  return (
    <>
      <PlaylistHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="px-3">
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
      </div>
    </>
  );
};

export default PlaylistList;
