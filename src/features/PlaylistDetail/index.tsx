import { useGetUserPlaylistQuery } from "@/store/slices/user/playlists";
import Header from "./Header";

const PlaylistDetail = ({ publicId }: { publicId: string }) => {
  const { data: playlist, isLoading } = useGetUserPlaylistQuery({ publicId });
  
  if (isLoading) return <div>Loading...</div>;
  if (!playlist) return <div>No playlist found</div>;

  return (
    <>
      <Header playlist={playlist} />
    </>
  );
};

export default PlaylistDetail;