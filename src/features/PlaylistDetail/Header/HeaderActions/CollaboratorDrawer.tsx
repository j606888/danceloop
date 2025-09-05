"use client";

import Drawer from "@/components/Drawer";
import Snackbar from "@mui/material/Snackbar";
import { Copy, Check, X } from "lucide-react";
import { useState } from "react";

const CollaboratorDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
        title="邀請協作者"
        withMinHeight={false}
      >
        <div className="flex flex-col px-2">
          <div className="flex items-center border-b border-[#E5E5E5]">
            <div className="flex-1 flex items-center" />
            <div className="flex items-center justify-center w-20 h-14 font-medium">擁有者</div>
            <div className="flex items-center justify-center w-20 h-14 bg-[#6784F6]/15 rounded-tr-[10px] rounded-tl-[10px]">協作者</div>
          </div>
          <div className="flex items-cente border-b border-[#E5E5E5]">
            <div className="flex-1 flex items-center text-sm ">新增/移除影片</div>
            <div className="flex items-center justify-center w-20 h-14">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center w-20 h-14 bg-[#6784F6]/15">
              <Check className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center border-b border-[#E5E5E5]">
            <div className="flex-1 flex items-center text-sm ">分享清單</div>
            <div className="flex items-center justify-center w-20 h-14">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center w-20 h-14 bg-[#6784F6]/15">
              <Check className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center border-b border-[#E5E5E5]">
            <div className="flex-1 flex items-center text-sm ">新增/移除協作者</div>
            <div className="flex items-center justify-center w-20 h-14">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center w-20 h-14 bg-[#6784F6]/15">
              <X className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-1 flex items-center text-sm ">調整瀏覽權限</div>
            <div className="flex items-center justify-center w-20 h-14 ">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center w-20 h-14 bg-[#6784F6]/15 rounded-bl-[10px] rounded-br-[10px]">
              <X className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-3 text-[#323232] py-3"
          onClick={handleCopyLink}
        >
          <div className="flex items-center justify-center bg-[#F2F2F2] rounded-full w-12 h-12 ">
            <Copy className="w-5 h-5" />
          </div>
          <span>複製連結</span>
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

export default CollaboratorDrawer;
