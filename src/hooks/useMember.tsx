import { PlaylistWithUser } from "@/store/slices/user/playlists";
import { useMeQuery } from "@/store/slices/user";
import { MemberRole } from "@prisma/client";

export default function useMember(playlist: PlaylistWithUser | undefined) {
  const { data: me } = useMeQuery();
  const isOwner = playlist?.userId === me?.id;
  const isCollaborator = playlist?.members.some(
    (member) => member.userId === me?.id && member.role === MemberRole.COLLABORATOR
  );
  const isFollowed = playlist?.members.some(
    (member) => member.userId === me?.id && member.role === MemberRole.FOLLOWER
  );
  const isUnfollowed = !(isOwner || isCollaborator || isFollowed);

  return { isOwner, isCollaborator, isFollowed, isUnfollowed };
}