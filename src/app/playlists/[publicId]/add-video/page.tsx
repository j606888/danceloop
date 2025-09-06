'use client'

import Navbar from "@/features/Navbar";
import PlaylistAddVideo from "@/features/PlaylistAddVideo";
import { useParams } from "next/navigation";

const AddVideoPage = () => {
  const { publicId } = useParams();

  return <>
    <Navbar />
    <PlaylistAddVideo publicId={publicId as string} />
  </>;
};

export default AddVideoPage;