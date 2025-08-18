"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CUSTOMER = "customer-ae2phsrffw6ivfgf.cloudflarestream.com";

export default function VideoDetail({ videoUid }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <iframe
        src={`https://${CUSTOMER}/${videoUid}/iframe?autoplay=true`}
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div
        className="absolute top-3 left-3 p-2 bg-white rounded-full cursor-pointer z-10"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-5 h-5" />
      </div>
    </div>
  );
}