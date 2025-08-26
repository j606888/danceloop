import { useDropzone } from "react-dropzone";

const UploadButton = ({
  onDrop,
}: {
  onDrop: (acceptedFiles: File[]) => void;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="p-5 border border-[#eeeeee] bg-[#fafafa] rounded-sm text-[#bdbdbd] cursor-pointer max-w-80"
    >
      <input {...getInputProps()} />
      <p>Drag & drop video, or click to select</p>
    </div>
  );
};

export default UploadButton;
