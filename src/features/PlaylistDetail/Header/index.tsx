import { PlaylistWithUser } from "@/store/slices/user/playlists";
import Collaborators from "./Collaborators";
import HeaderActions from "./HeaderActions";
import Followers from "./Followers";
import MetaInfo from "./MetaInfo";

const Header = ({ playlist, videoCount }: { playlist: PlaylistWithUser, videoCount: number }) => {
  return (
    <div className="bg-[#F2F2F2]">
      <HeaderActions publicId={playlist.publicId} />
      <div className="flex flex-col gap-2 px-4 pb-2">
        <h2 className="text-lg font-medium text-[#343434]">{playlist.title}</h2>
        <div className="flex items-center gap-3">
          <Collaborators playlist={playlist}/>
          <Followers />
        </div>
        <MetaInfo playlist={playlist} videoCount={videoCount}/>
      </div>
    </div>
    );
  };

export default Header;