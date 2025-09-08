"use client";

import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";
import { useRef } from "react";

// Can jump to specific time
const CUSTOMER = "customer-ae2phsrffw6ivfgf.cloudflarestream.com";

function VideoDetailInner({ videoUid }: { videoUid: string }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const router = useRouter();
  const streamRef = useRef<StreamPlayerApi | undefined>(undefined);

  function handleBack() {
    if (from) {
      router.push(from);
    } else {
      router.push("/");
    }
  }

  function handleJump(seconds: number) {
    if (streamRef.current) {
      const currentTime = streamRef.current.currentTime;
      streamRef.current.currentTime = currentTime + seconds;
    }

  }

  function handleJumpTo(seconds: number) {
    if (streamRef.current) {
      streamRef.current.currentTime = seconds;
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">

      {/* <iframe
        src={`https://${CUSTOMER}/${videoUid}/iframe?autoplay=true`}
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      /> */}
      <Stream
        controls
        src={videoUid}
        autoplay
        streamRef={streamRef}
        onPlay={() => {
          console.log("play");
        }}
        onDurationChange={(e) => {
          console.log("onDurationChange", e);
        }}
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
        <button className="rounded-full bg-white p-2 shadow" onClick={() => {
          handleJump(10)
        }}>jump 10 seconds</button>
        <button className="rounded-full bg-white p-2 shadow" onClick={() => {
          handleJumpTo(30)
        }}>jump to 0:30</button>
        
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