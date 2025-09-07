import { useReducer } from "react";
import { BeatLoader } from "react-spinners";
import { CirclePlus } from "lucide-react";
import { useGetUserVideosQuery } from "@/store/slices/user/videos";
import {
  filterDraftReducer,
  bindSetField,
  initialFilterDraft,
} from "@/components/Searchbar/filterDraft";
import VideoCard from "@/components/VideoCard";
import { useAddVideoToPlaylistMutation } from "@/store/slices/user/playlists";
import Header from "./Header";

const PlaylistAddVideo = ({ publicId }: { publicId: string }) => {
  const [filters, dispatch] = useReducer(
    filterDraftReducer,
    initialFilterDraft
  );
  const { data, isLoading } = useGetUserVideosQuery({ ...filters, excludePlaylistId: publicId });
  const videos = data?.result;
  const setField = bindSetField(dispatch);
  const [addVideoToPlaylist] = useAddVideoToPlaylistMutation();

  const handleAddVideoToPlaylist = (videoUid: string) => {
    addVideoToPlaylist({ publicId, videoUid });
  };

  return (
    <>
      <Header publicId={publicId} setField={setField} filters={filters} />
      <div className="p-2.5">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <BeatLoader size={20} color="#4A81D9" />
          </div>
        ) : (
          <>
            {videos?.map((video) => (
              <div key={video.id} className="flex items-center gap-2">
                <CirclePlus className="text-[#444444]" onClick={() => handleAddVideoToPlaylist(video.uid)} />
                <VideoCard video={video} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PlaylistAddVideo;
