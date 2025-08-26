"use client";

import { Button } from "@mui/material";
import useUpload from "./useUpload";
import CircularProgress from "./CircularProgress";
import UploadButton from "./UploadButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UploadPage = () => {
  const router = useRouter();
  const {
    file,
    videoURL,
    uploading,
    uploadError,
    uploadSuccess,
    uploadProgress,
    handleUpload,
    onDrop,
  } = useUpload();

  useEffect(() => {
    if (uploadSuccess) {
      router.push("/admin/videos");
    }
  }, [uploadSuccess, router]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-2xl font-bold">Upload Video</h1>
        <p className="text-sm text-gray-500">Upload a video to the DanceLoop</p>
      </div>
      <UploadButton onDrop={onDrop} />

      {videoURL && (
        <video
          src={videoURL}
          controls
          className="mt-4 max-w-60  max-h-60 rounded-lg"
        />
      )}

      {uploading && <CircularProgress value={uploadProgress} />}
      {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
      {videoURL && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      )}
    </div>
  );
};

export default UploadPage;
