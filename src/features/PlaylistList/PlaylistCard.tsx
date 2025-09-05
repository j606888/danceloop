import { Folder, Dot, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
const PlaylistCard = () => {
  const publicId = "ABCD1234"
  const router = useRouter();

  return (
      <div className="flex items-center gap-3 pb-2 border-b border-[#F2F2F2] pt-2 last:border-b-0" onClick={() => router.push(`/playlists/${publicId}`)}>
        <div className="flex items-center justify-center w-16 h-16 rounded-[4px] bg-[#555555]/12">
          <Folder className="w-7 h-7 text-[#555555]" strokeWidth={2.5}/>
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <h4>翰林 Salsa Zero - 2025 第二期</h4>
          <div className="flex items-center gap-0.5 text-sm text-[#999999]">
            <span>James Lee</span>
            <Dot className="w-4 h-4" strokeWidth={5}/>
            <span>8 部影片</span>
            <Dot className="w-4 h-4" strokeWidth={5}/>
            <span>不公開</span>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-[#343434]" />
      </div>
  );
};

export default PlaylistCard;