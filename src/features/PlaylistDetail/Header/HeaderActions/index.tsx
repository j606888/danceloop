import {
  ChevronLeft,
  Share,
  EllipsisVertical,
  CirclePlus,
  List,
  Pencil,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ListItemText, ListItemIcon, Menu, MenuItem, Snackbar } from "@mui/material";
import EditDrawer from "./EditDrawer";
import CollaboratorDrawer from "./CollaboratorDrawer";
import ShareDrawer from "./ShareDrawer";
import { PlaylistWithUser } from "@/store/slices/user/playlists";
import { useMeQuery } from "@/store/slices/user";
import { useFollowPlaylistMutation, useUnfollowPlaylistMutation } from "@/store/slices/user/playlists";
import { MemberRole } from "@prisma/client";

const HeaderActions = ({ playlist, publicId }: { playlist: PlaylistWithUser, publicId: string }) => {
  const me = useMeQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState<
    "share" | "collaborate" | "edit" | null
  >(null);
  const open = Boolean(anchorEl);
  const isFollowed = playlist.members.some((member) => member.userId === me.data?.id && member.role === MemberRole.FOLLOWER);
  const [followPlaylist] = useFollowPlaylistMutation();
  const [unfollowPlaylist] = useUnfollowPlaylistMutation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();

  function handleBack() {
    // if (window.history.length > 1) {
    //   router.back();
    // } else {
      router.push("/playlists");
    // }
  }

  function handleAddToPlaylist() {
    router.push(`/playlists/${publicId}/add-video`);
  }

  function handleOpenDrawer(drawer: "share" | "collaborate" | "edit") {
    setOpenDrawer(drawer);
    setAnchorEl(null);
  }

  async function handleFollowPlaylist() {
    await followPlaylist({ publicId });
    setOpenSnackbar(true);
    setSnackbarMessage("已追蹤");
  }
  
  async function handleUnfollowPlaylist() {
    await unfollowPlaylist({ publicId });
    setOpenSnackbar(true);
    setSnackbarMessage("已取消追蹤");
  }

  return (
    <>
      <div className="flex items-center justify-between px-2 h-[56px]">
        <div
          className="flex items-center justify-center w-10 h-10 "
          onClick={handleBack}
        >
          <ChevronLeft className="w-6 h-6" />
        </div>
        <div className="flex items-center">
          <button className={`text-sm text-[#444444] border-1  rounded-lg px-2 py-1 mr-3 ${isFollowed ? "bg-[#444444] text-white border-[#444444]" : "border-[#777777]"}`} onClick={() => isFollowed ? handleUnfollowPlaylist() : handleFollowPlaylist()}>{isFollowed ? "追蹤中" : "追蹤"}</button>
          <div
            className="flex items-center justify-center w-10 h-10"
            onClick={() => handleOpenDrawer("share")}
          >
            <Share className="w-6 h-6" />
          </div>
          <div
            className="flex items-center justify-center w-10 h-10 "
            onClick={handleClick}
          >
            <EllipsisVertical className="w-6 h-6" />
          </div>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ autoFocusItem: false }}
        >
          <MenuItem onClick={() => handleOpenDrawer("share")}>
            <ListItemIcon>
              <Share className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>分享清單</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAddToPlaylist}>
            <ListItemIcon>
              <CirclePlus className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>新增至這個清單</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAddToPlaylist}>
            <ListItemIcon>
              <CirclePlus className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>追蹤這個清單</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <List className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>編輯清單</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleOpenDrawer("edit")}>
            <ListItemIcon>
              <Pencil className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>名稱與權限</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleOpenDrawer("collaborate")}>
            <ListItemIcon>
              <UserPlus className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>邀請協作者</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      <ShareDrawer
        open={openDrawer === "share"}
        onClose={() => setOpenDrawer(null)}
        onInviteCollaborator={() => handleOpenDrawer("collaborate")}
      />
      <CollaboratorDrawer
        open={openDrawer === "collaborate"}
        onClose={() => setOpenDrawer(null)}
      />
      <EditDrawer
        open={openDrawer === "edit"}
        onClose={() => setOpenDrawer(null)}
      />
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
    </>
  );
};

export default HeaderActions;
