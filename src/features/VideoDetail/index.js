"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CUSTOMER = "customer-ae2phsrffw6ivfgf.cloudflarestream.com";

export default function VideoDetail({ videoUid }) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <iframe
        src={`https://${CUSTOMER}/${videoUid}/iframe?autoplay=true`}
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
    </div>
  );
}
