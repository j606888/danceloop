import { useState, useRef, useEffect } from "react";
import * as tus from "tus-js-client";

function b64(v: string) {
  return btoa(unescape(encodeURIComponent(v)));
}

export default function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "ready" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [mediaId, setMediaId] = useState<string | null>(null);

  const uploaderRef = useRef<tus.Upload | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setStatus("ready");
    setProgress(0);
    setMessage(null);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return

    setStatus("uploading");
    setMessage(null);
    setFile(f);
  
    const metadata = [
      `name ${b64(f.name)}`,
      `filetype ${b64(f.type || "video/mp4")}`,
    ].join(",");
  
    const upload = new tus.Upload(f, {
      endpoint: "/api/stream/tus",
      chunkSize: 50 * 1024 * 1024,
      retryDelays: [0, 3000, 5000, 10000],
      headers: {
        "Upload-Metadata": metadata,
      },
      onError: (err) => {
        setStatus("error");
        setMessage(err.message || "Upload failed");
      },
      onProgress: (uploaded, total) => {
        setProgress(Math.round((uploaded / total) * 100));
      },
      onAfterResponse: (_req, res) => {
        const mid = res.getHeader("stream-media-id");
        if (mid && typeof mid === "string") setMediaId(mid);
      },
      onSuccess: () => {
        setStatus("success");
        setProgress(100);
        setMessage("Upload finished");
      },
    });
  
    uploaderRef.current = upload;
    upload.start();
  };

  return {
    file,
    preview,
    progress,
    status,
    message,
    mediaId,
    onSelect,
  };
}