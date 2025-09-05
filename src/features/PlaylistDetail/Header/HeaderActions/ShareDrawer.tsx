"use client";

import Drawer from "@/components/Drawer";
import Snackbar from "@mui/material/Snackbar";
import { Copy, UserPlus } from "lucide-react";
import { useState } from "react";

const ShareDrawer = ({
  open,
  onClose,
  onInviteCollaborator,
}: {
  open: boolean;
  onClose: () => void;
  onInviteCollaborator: () => void;
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopyLink = async () => {
    // await navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar(true);
    onClose();
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        title="分享清單"
        withMinHeight={false}
      >
        <div
          className="flex items-center gap-3 text-[#323232] py-3"
          onClick={handleCopyLink}
        >
          <div className="flex items-center justify-center bg-[#F2F2F2] rounded-full w-12 h-12 ">
            <Copy className="w-5 h-5" />
          </div>
          <span>複製連結</span>
        </div>
        <div className="flex items-center gap-3 text-[#323232] pb-2" onClick={onInviteCollaborator}>
          <div className="flex items-center justify-center bg-[#F2F2F2] rounded-full w-12 h-12 ">
            <UserPlus className="w-5 h-5" />
          </div>
          <span>邀請協作者</span>
        </div>
      </Drawer>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="連結已複製"
        autoHideDuration={3000}
      />
    </>
  );
};

export default ShareDrawer;
