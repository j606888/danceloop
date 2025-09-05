import { PlaylistWithUser } from "@/store/slices/user/playlists";

const Collaborators = ({ playlist }: { playlist: PlaylistWithUser }) => {
  const firstName = playlist.user.name.split(" ")[0];
  return (
    <div className="flex items-center gap-1">
      <div className="text-xs font-medium bg-[#DD886F] text-white w-5 h-5 flex items-center justify-center rounded-full">{firstName.charAt(0)}</div>
      <span className="text-sm text-[#434343]">{playlist.user.name}</span>
    </div>
  );
};

export default Collaborators;