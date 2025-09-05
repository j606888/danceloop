"use client";

import PlaylistDetail from "@/features/PlaylistDetail";
import Navbar from "@/features/Navbar";
import { useParams } from "next/navigation";

const PlaylistDetailPage = () => {
  const { publicId } = useParams();
  
  return <>
    <Navbar />
    <PlaylistDetail publicId={publicId as string} />
  </>;
};

export default PlaylistDetailPage;