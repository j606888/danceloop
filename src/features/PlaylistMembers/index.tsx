"use client";

import {
  useGetUserPlaylistQuery,
  Member,
  useUpdatePlaylistMemberRoleMutation,
  useRemovePlaylistMemberMutation,
} from "@/store/slices/user/playlists";
import { MemberRole } from "@prisma/client";
import { Ellipsis, ArrowBigDownDash, ArrowBigUpDash, Ban } from "lucide-react";
import Header from "./Header";
import { useState } from "react";
import { ListItemText, ListItemIcon, Menu, MenuItem } from "@mui/material";

const PlaylistMembers = ({ publicId }: { publicId: string }) => {
  const { data: playlist, isLoading } = useGetUserPlaylistQuery({ publicId });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [updatePlaylistMemberRole] = useUpdatePlaylistMemberRoleMutation();
  const [removePlaylistMember] = useRemovePlaylistMemberMutation();
  const open = Boolean(anchorEl);

  const members = playlist?.members || [];
  const owner = members.find((member) => member.role === MemberRole.OWNER);
  const collaborators = members.filter(
    (member) => member.role === MemberRole.COLLABORATOR
  );
  const followers = members.filter(
    (member) => member.role === MemberRole.FOLLOWER
  );

  const handleClick = (member: Member, event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
    setSelectedMember(member);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateRole = async (member: Member, role: MemberRole) => {
    if (member.role === role) return;
    await updatePlaylistMemberRole({
      publicId,
      userId: member.userId.toString(),
      role,
    }).unwrap();
    handleClose();
  };

  const handleRemoveMember = async (member: Member) => {
    await removePlaylistMember({
      publicId,
      userId: member.userId.toString(),
    }).unwrap();
    handleClose();
  };

  return (
    <>
      <Header publicId={publicId} />
      <h3 className="px-3 py-2 text-[#343434] text-sm font-semibold">擁有者</h3>
      {isLoading ? <Skeleton /> : <UserIcon member={owner!} />}
      {collaborators.length > 0 && (
        <h3 className="px-3 py-2 text-[#343434] text-sm font-semibold">
          協作者
        </h3>
      )}
      <div>
        {isLoading ? (
          <Skeleton />
        ) : (
          collaborators.map((collaborator) => (
            <UserIcon
              key={collaborator.userId}
              member={collaborator}
              handleClick={handleClick}
            />
          ))
        )}
      </div>
      {followers.length > 0 && (
        <h3 className="px-3 py-2 text-[#343434] text-sm font-semibold">
          追蹤中
        </h3>
      )}
      <div>
        {isLoading ? (
          <Skeleton />
        ) : (
          followers.map((follower) => (
            <UserIcon
              key={follower.userId}
              member={follower}
              handleClick={handleClick}
            />
          ))
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ autoFocusItem: false }}
      >
        {selectedMember?.role === MemberRole.COLLABORATOR && (
          <MenuItem
            onClick={() =>
              handleUpdateRole(selectedMember, MemberRole.FOLLOWER)
            }
          >
            <ListItemIcon>
              <ArrowBigDownDash className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>降為追蹤者</ListItemText>
          </MenuItem>
        )}
        {selectedMember?.role === MemberRole.FOLLOWER && (
          <MenuItem
            onClick={() =>
              handleUpdateRole(selectedMember, MemberRole.COLLABORATOR)
            }
          >
            <ListItemIcon>
              <ArrowBigUpDash className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>升為協作者</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleRemoveMember(selectedMember!)}>
          <ListItemIcon>
            <Ban className="w-5 h-5" />
          </ListItemIcon>
          <ListItemText>從清單移除</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const Skeleton = () => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 animate-pulse">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200"></div>
      <div className="h-3 rounded bg-gray-200 w-20"></div>
    </div>
  );
};

const UserIcon = ({
  member,
  handleClick,
}: {
  member: Member;
  handleClick?: (member: Member, event: React.MouseEvent<SVGElement>) => void;
}) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#DD886F] text-white text-lg font-medium">
        {member.name.charAt(0)}
      </div>
      <span className="flex-1">{member.name}</span>
      {handleClick && (
        <Ellipsis
          className="w-6 h-6 text-[#454545]"
          onClick={(event) => handleClick(member, event)}
        />
      )}
    </div>
  );
};

export default PlaylistMembers;
