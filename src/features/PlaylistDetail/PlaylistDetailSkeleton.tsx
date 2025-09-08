import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PlaylistDetailSkeleton = () => {
  const router = useRouter();

  function handleBack() {
    router.push("/playlists");
  }
  return (
    <>
      <div className="h-[152px] flex flex-col w-full gap-3 p-3 bg-[#F2F2F2]">
        <div
          className="flex items-center justify-center w-10 h-10 "
          onClick={handleBack}
        >
          <ChevronLeft className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-3 animate-pulse px-2">
          <div className="h-3 rounded bg-gray-300 w-40"></div>
          <div className="h-3 rounded bg-gray-300 w-20"></div>
          <div className="h-3 rounded bg-gray-300 w-16"></div>
        </div>
      </div>
    </>
  );
};

export default PlaylistDetailSkeleton;
