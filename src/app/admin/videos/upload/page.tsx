"use client";


import * as React from 'react';
import { useGetUploadLinkQuery } from "@/store/slices/admin/video";
import { PulseLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import { useState } from 'react';
import { Button } from '@mui/material';

const UploadPage = () => {
  const { data, isLoading } = useGetUploadLinkQuery(undefined);

  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    multiple: false,
    onDrop,
  });

  const handleUpload = async () => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={20} color="#4A81D9" />
      </div>
    );
  }

  return (
    <div>
      <h1>Upload Page</h1>
      <p>{data?.uploadURL}</p>

      <div {...getRootProps()} className="border p-4 cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop video, or click to select</p>
      </div>

      {videoURL && (
        <video
          src={videoURL}
          controls
          className="mt-4 max-w-60 rounded-lg"
        />
      )}

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-200"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <span className="text-xs ml-2">{uploadProgress}%</span>
        </div>
      )}
      {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
      {uploadSuccess && <p className="text-green-600 mt-2">Upload successful!</p>}
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
};

export default UploadPage;