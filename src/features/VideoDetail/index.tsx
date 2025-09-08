"use client";

import { ChevronLeft, Share2 } from "lucide-react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Stream } from "@cloudflare/stream-react";
import toast from "react-hot-toast";

function VideoDetailInner({ videoUid }: { videoUid: string }) {
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
    navigator.clipboard.writeText(`${window.location.origin}/video/${videoUid}`);
    toast.success("連結已複製");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Stream controls src={videoUid} autoplay />
      <div className={`absolute left-3 top-3 z-20 opacity-50`}>
        <button
          onClick={handleBack}
          className="rounded-full bg-white p-2 shadow"
        >
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>
      </div>
      <div className="absolute right-5 top-5 z-10">
        <button className="flex flex-col items-center justify-center gap-1" onClick={handleShare}>
          <Share2 className="h-5 w-5 text-white" />
          <span className="text-xs text-white">分享</span>
        </button>
      </div>
    </div>
  );
}

export default function VideoDetail({ videoUid }: { videoUid: string }) {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VideoDetailInner videoUid={videoUid} />
    </Suspense>
  );
}
