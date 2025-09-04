import { Video } from "@/store/slices/videos";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const PreviewImage = ({ video }: { video: Video }) => {
  const duration = format(video.duration * 1000, "m:ss");
  const router = useRouter();
  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 w-[92px] h-[120px] bg-gray-200 ${
        video.state !== "READY" ? "animate-pulse" : ""
      }`}
      onClick={() => router.push(`/video/${video.uid}`)}
    >
      {video.state === "READY" ? (
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <p className="text-xs text-center m-1 text-gray-500">{video.state}</p>
      )}
      {duration && (
        <div className="absolute bottom-1.5 right-1.5 text-white p-1 text-xs font-medium bg-black/50 rounded-md">
          {duration}
        </div>
      )}
    </div>
  );
};

export default PreviewImage;
