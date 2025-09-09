"use client";

import Drawer from "@/components/Drawer";
import { Copy, UserPlus } from "lucide-react";
import { useCreateUserShareLinkMutation } from "@/store/slices/user/shareLink";
import { ShareLinkRole, ShareLinkType } from "@prisma/client";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";

const ShareDrawer = ({
  publicId,
  open,
  onClose,
  onInviteCollaborator,
}: {
  publicId: string;
  open: boolean;
  onClose: () => void;
  onInviteCollaborator: () => void;
}) => {
  const [shareLink, setShareLink] = useState<string>("");
  const [createUserShareLink] = useCreateUserShareLinkMutation();

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    toast.success("連結已複製");
    onClose();
  };

  const retrieveShareLink = useCallback(async () => {
    const shareLink = await createUserShareLink({
      type: ShareLinkType.PLAYLIST,
      playlistPublicId: publicId,
      role: ShareLinkRole.FOLLOWER,
    }).unwrap();
    const shareLinkPublicId = shareLink.publicId;
    setShareLink(
      `${window.location.origin}/playlists/${publicId}?sl=${shareLinkPublicId}`
    );
  }, [publicId, createUserShareLink]);

  useEffect(() => {
    if (open && !shareLink) {
      console.log("retrieveShareLink");
      retrieveShareLink();
    }
  }, [open, retrieveShareLink, shareLink]);

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
        <div
          className="flex items-center gap-3 text-[#323232] pb-2"
          onClick={onInviteCollaborator}
        >
          <div className="flex items-center justify-center bg-[#F2F2F2] rounded-full w-12 h-12 ">
            <UserPlus className="w-5 h-5" />
          </div>
          <span>邀請協作者</span>
        </div>
      </Drawer>
    </>
  );
};

export default ShareDrawer;
