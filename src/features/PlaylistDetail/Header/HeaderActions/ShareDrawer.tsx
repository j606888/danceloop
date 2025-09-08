"use client";

import Drawer from "@/components/Drawer";
import { Copy, UserPlus } from "lucide-react";
import { useCreateUserShareLinkMutation } from "@/store/slices/user/shareLink";
import { ShareLinkRole, ShareLinkType } from "@prisma/client";
import toast from "react-hot-toast";

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
  const [createUserShareLink] = useCreateUserShareLinkMutation();

  const handleCopyLink = async () => {
    const shareLink = await createUserShareLink({
      type: ShareLinkType.PLAYLIST,
      playlistPublicId: publicId,
      role: ShareLinkRole.FOLLOWER,
    }).unwrap();
    const shareLinkPublicId = shareLink.publicId;
    await navigator.clipboard.writeText(
      `${window.location.origin}/playlists/${publicId}?sl=${shareLinkPublicId}`
    );

    toast.success("連結已複製");
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
