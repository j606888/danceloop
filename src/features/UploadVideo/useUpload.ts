import { useEffect, useState } from "react";
import { useGetUploadLinkMutation } from "@/store/slices/admin/video";

function useUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [getUploadLink] = useGetUploadLinkMutation();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    if (file && canUpload) {
      handleUpload();
    }
  }, [file, canUpload]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileSize = file.size;

    if (file) {
      setVideoURL(URL.createObjectURL(file));
      setFile(file);
      setUploadSuccess(false);
      // if file size less than 200 MB, set canUpload to true
      if (fileSize < 200 * 1024 * 1024) {
        setCanUpload(true);
        setUploadError(null);
      } else {
        setCanUpload(false);
        setUploadError("Only supports up to 200MB video files currently, please select a smaller file");
      }
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