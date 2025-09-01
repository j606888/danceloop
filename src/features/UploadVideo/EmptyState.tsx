"use client";

import { CloudUpload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { PulseLoader } from "react-spinners";
import { useState, useEffect } from "react";

const UploadVideo = ({
  onDrop,
  uploadError,
}: {
  onDrop: (acceptedFiles: File[]) => void;
  uploadError: string | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setIsLoading(true);
      onDrop(acceptedFiles);
    },
  });

  useEffect(() => {
    if (uploadError) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [uploadError]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 fixed left-0 right-0 bottom-0 top-0">
        <div className="relative w-[100px] h-[100px] flex items-center justify-center bg-[#ECEFFB] rounded-full">
          <div className="absolute w-full h-full flex items-center justify-center bg-[#ECEFFB] rounded-full animate-ping opacity-75"></div>
          <CloudUpload className="text-[#6784F6] w-10 h-10 z-10" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1 px-8 text-center">
          <h3 className="font-medium text-[#232323]">
            Select the video file here
          </h3>
          <p className="text-sm font-medium text-[#646464]">
            Your video will remain private until it is published.
          </p>
        </div>
        {uploadError && (
          <p className="text-[#BD4545] p-2.5 bg-[#FDEAEA] text-sm mx-7">
            {uploadError}
          </p>
        )}
        <button
          className="flex gap-2 items-center bg-[#6784F6] text-white px-4 py-3 rounded-full font-medium "
          {...getRootProps()}
        >
          Select File
          {isLoading && <PulseLoader color="#FFFFFF" size={3} />}
        </button>
        <input {...getInputProps()} />
      </div>
    </>
  );
};

export default UploadVideo;
