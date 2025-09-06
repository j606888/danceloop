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
import { ListItemText, ListItemIcon, Menu, MenuItem } from "@mui/material";
import EditDrawer from "./EditDrawer";
import CollaboratorDrawer from "./CollaboratorDrawer";
import ShareDrawer from "./ShareDrawer";

const HeaderActions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState<
    "share" | "collaborate" | "edit" | null
  >(null);
  const open = Boolean(anchorEl);

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

  function handleOpenDrawer(drawer: "share" | "collaborate" | "edit") {
    setOpenDrawer(drawer);
    setAnchorEl(null);
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <CirclePlus className="w-5 h-5" />
            </ListItemIcon>
            <ListItemText>新增至這個清單</ListItemText>
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
    </>
  );
};

export default HeaderActions;
