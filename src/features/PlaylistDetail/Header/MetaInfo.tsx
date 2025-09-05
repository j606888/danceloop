import { PlaylistWithUser } from "@/store/slices/user/playlists";
import { Dot } from "lucide-react";
import { PLAYLIST_VISIBILITY_LABELS } from "@/lib/constants";

const MetaInfo = ({ playlist }: { playlist: PlaylistWithUser }) => {
  return (
    <div className="flex items-center gap-1 text-sm text-[#999999]">
      <span>{PLAYLIST_VISIBILITY_LABELS[playlist.visibility]}</span>
      <Dot className="w-4 h-4" strokeWidth={5}/>
      <span>0 部影片</span>
    </div>
  );
};

export default MetaInfo;