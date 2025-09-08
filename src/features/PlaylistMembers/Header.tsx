import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ publicId }: { publicId: string }) => {
  const router = useRouter();
  return (
    <div className="sticky top-[56px] p-2.5 bg-[#F1F1F1] flex flex-col gap-2.5 z-20">
    <div className="relative text-center">
      <div
        className="absolute left-0 top-0 bottom-0 flex items-center justify-center  w-6"
        onClick={() => router.push(`/playlists/${publicId}`)}
      >
        <ChevronLeft className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-[#232323] py-2">成員</h3>
    </div>
  </div>
  );
};

export default Header;