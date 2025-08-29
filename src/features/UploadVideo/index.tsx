"use client";

import useUpload from "./useUpload";
import UploadToast from "@/components/UploadToast";
import EmptyState from "./EmptyState";
import DetailState from "./DetailState";
import { useEffect, useState } from "react";

const UploadVideo = () => {
  const [currentStep, setCurrentStep] = useState<"Empty" | "Details">("Empty");
  const {
    // file,
    // videoURL,
    uploading,
    uploadError,
    uploadSuccess,
    uploadProgress,
    // handleUpload,
    onDrop,
  } = useUpload();

  useEffect(() => {
    if (uploading) {
      setCurrentStep("Details");
    }
  }, [uploading]);

  return (
    <>
      {currentStep === "Empty" && (
        <EmptyState onDrop={onDrop} uploadError={uploadError} />
      )}
      {currentStep === "Details" && (
        <DetailState
          uploadSuccess={uploadSuccess}
          uploadProgress={uploadProgress}
        />
      )}
      {/* {(uploading || uploadSuccess) && (
        <UploadToast
          uploadProgress={uploadProgress}
          uploadSuccess={uploadSuccess}
        />
      )} */}
    </>
  );
};

export default UploadVideo;
