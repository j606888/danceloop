import { useState } from "react";
import { useGetAdminUploadLinkMutation } from "@/store/slices/admin/video";
import * as tus from "tus-js-client";


function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [getUploadLink] = useGetAdminUploadLinkMutation();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoURL(URL.createObjectURL(file));
      setFile(file);
      setUploadSuccess(false);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    const { data } = await getUploadLink(undefined);
    if (!file || !data?.uploadURL) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', data.uploadURL);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setUploadProgress(100);
            resolve();
          } else {
            reject(new Error('Upload failed'));
          }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(formData);
      });
      setUploadSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUploadError(err.message || 'Upload failed');
      } else {
        setUploadError('Upload failed');
      }
    } finally {
      setUploading(false);
    }
  };

  return {
    file,
    videoURL,
    uploading,
    uploadError,
    uploadSuccess,
    onDrop,
    handleUpload,
    uploadProgress,
  };
}

export default useUpload;