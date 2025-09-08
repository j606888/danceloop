"use client";

import { ChevronLeft, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Video } from "@prisma/client";

const CUSTOMER = "customer-ae2phsrffw6ivfgf.cloudflarestream.com";

export default function VideoDetailInner({ video }: { video: Video }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const router = useRouter();

  function handleBack() {
    if (from) {
      router.push(from);
    } else {
      router.push("/");
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(`${window.location.origin}/video/${video.uid}`);
    toast.success("連結已複製");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <iframe
        src={`https://${CUSTOMER}/${video.uid}/iframe?autoplay=true`}
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
      <div
        className={`absolute left-3 top-3 z-20 opacity-50`}
      >
        <button
          onClick={handleBack}
          className="rounded-full bg-white p-2 shadow"
        >
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>
      </div>
      <div className="absolute right-5 top-5 z-10" onClick={handleShare}>
        <Share2 className="h-5 w-5 text-white" />
        <span className="text-xs text-white">分享</span>
      </div>
    </div>
  );
}