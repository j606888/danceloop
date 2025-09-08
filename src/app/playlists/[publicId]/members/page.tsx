import PlaylistMembers from "@/features/PlaylistMembers";
import Navbar from "@/features/Navbar";

const PlaylistMembersPage = async ({ params }: { params: Promise<{ publicId: string }> }) => {
  const { publicId } = await params;
  return (
    <div>
      <Navbar />
      <PlaylistMembers publicId={publicId} />
    </div>
  );
};

export default PlaylistMembersPage;