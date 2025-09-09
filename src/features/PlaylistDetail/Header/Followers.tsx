import { PlaylistWithUser } from "@/store/slices/user/playlists";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";

const Followers = ({ playlist }: { playlist: PlaylistWithUser }) => {
  const router = useRouter();
  const followers = playlist.members.filter((member) => member.role === MemberRole.FOLLOWER)

  if (followers.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push(`/playlists/${playlist.publicId}/members`)}>
      <div className="flex items-center -space-x-2.5">
        {followers.map((follower) => (
          <Avatar key={follower.userId} name={follower.name} />
        ))}
      </div>
      <span className="text-sm text-[#434343]">{followers.length} 位追蹤者</span>
    </div>
  );
};

const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="text-xs font-medium bg-[#877E7B] text-white w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#F2F2F2]">{name.charAt(0)}</div>
  )
}

export default Followers;