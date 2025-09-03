"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import * as tus from "tus-js-client";

function b64(v: string) {
  return btoa(unescape(encodeURIComponent(v)));
}

export default function UploadDemoPage() {
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
    if (f) setFile(f);
  };

  const startUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    setMessage(null);

    const metadata = [
      `name ${b64(file.name)}`,
      `filetype ${b64(file.type || "video/mp4")}`,
    ].join(",");

    const upload = new tus.Upload(file, {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">
            Cloudflare Stream – TUS Upload Demo
          </h1>
          <p className="text-sm text-gray-600">
            Select a video, then start a resumable upload ({">"}200MB
            supported).
          </p>
        </header>

        {/* Picker */}
        <div className="">
          <label
            htmlFor="upload-file"
            className="inline-flex items-center justify-center text-sm font-medium bg-[#6784F6] text-white px-4 h-[36px] rounded-xl"
          >
            選取檔案
          </label>
          <input
            id="upload-file"
            type="file"
            accept="video/*"
            name="選擇檔案"
            onChange={onSelect}
            className="hidden"
          />
          <VideoPreview preview={preview}/>
        </div>
        <p>File name: {file?.name}</p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
            disabled={!file || status === "uploading"}
            onClick={startUpload}
          >
            Start upload
          </button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 flex items-center justify-between">
            <span>Progress: {progress}%</span>
            <span>Status: {status}</span>
          </div>
          {mediaId && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">stream-media-id:</span> {mediaId}
            </div>
          )}
          {message && (
            <div
              className={
                "text-sm " +
                (status === "error" ? "text-red-600" : "text-gray-700")
              }
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const VideoPreview = ({ preview }: { preview: string | null }) => {
  const [open, setOpen] = useState(false);
  if (!preview) return null;

  return (
    <>
      <button onClick={() => setOpen(true)}>Preview</button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="absolute h-[70vh] w-full bg-[#232323] flex items-center justify-center">
          <X onClick={() => setOpen(false)} className="absolute top-4 right-4 w-6 h-6 cursor-pointer text-white z-100" />
              <video src={preview} controls className="h-full w-full" />
            </div>
        </div>
      )}
    </>
  );
};