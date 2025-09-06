import { Folder, Dot, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PlaylistWithUser } from "@/store/slices/user/playlists";
import { PLAYLIST_VISIBILITY_LABELS } from "@/lib/constants";

const PlaylistCard = ({ playlist }: { playlist: PlaylistWithUser }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-3 pb-2 border-b border-[#F2F2F2] pt-2 last:border-b-0"
      onClick={() => router.push(`/playlists/${playlist.publicId}`)}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-[4px] bg-[#555555]/12">
        <Folder className="w-7 h-7 text-[#555555]" strokeWidth={2.5} />
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <h4>{playlist.title}</h4>
        <div className="flex items-center gap-0.5 text-sm text-[#999999]">
          <span>{playlist.user.name}</span>
          <Dot className="w-4 h-4" strokeWidth={5} />
          <span>{playlist.videoCount} 部影片</span>
          <Dot className="w-4 h-4" strokeWidth={5} />
          <span>{PLAYLIST_VISIBILITY_LABELS[playlist.visibility]}</span>
        </div>
      </div>
      <ChevronRight className="w-6 h-6 text-[#343434]" />
    </div>
  );
};

export default PlaylistCard;
