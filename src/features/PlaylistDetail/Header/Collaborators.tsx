import { PlaylistWithUser, Member } from "@/store/slices/user/playlists";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";

const Collaborators = ({ playlist }: { playlist: PlaylistWithUser }) => {
  const router = useRouter();

  const members = playlist.members
  const collaborators = members.filter((member) => member.role === MemberRole.COLLABORATOR)
  const owner = members.find((member) => member.role === MemberRole.OWNER)
  const displayText = generateDisplayText(owner!, collaborators)

  return (
    <div className="flex items-center gap-1 cursor-pointer"  onClick={() => router.push(`/playlists/${playlist.publicId}/members`)}>
      <div className="flex items-center -space-x-2.5">
        <Avatar name={owner?.name || ""} />
        {collaborators.map((collaborator) => (
          <Avatar key={collaborator.userId} name={collaborator.name} />
        ))}
      </div>
      <span className="text-sm text-[#434343]">{displayText}</span>
    </div>
  );
};

function generateDisplayText(owner: Member, collaborators: Member[]) {
  if (collaborators.length === 0) {
    return `${owner.name}`;
  }
  if (collaborators.length === 1) {
    return `${owner.name} 和 ${collaborators[0].name}`;
  }
  return `${owner.name} 和 ${collaborators.length} 位協作者`;
}

const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="text-xs font-medium bg-[#877E7B] text-white w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#F2F2F2]">{name.charAt(0)}</div>
  )
}


export default Collaborators;