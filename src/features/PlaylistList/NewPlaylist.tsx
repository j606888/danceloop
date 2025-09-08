import { Plus } from "lucide-react";
import Drawer from "@/components/Drawer";
import { useState } from "react";
import {
  PLAYLIST_VISIBILITIES,
  PLAYLIST_VISIBILITY_OPTIONS,
  PlaylistVisibility,
} from "@/lib/constants";
import { useCreateUserPlaylistMutation } from "@/store/slices/user/playlists";
import toast from "react-hot-toast";

const NewPlaylist = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<PlaylistVisibility>(
    PLAYLIST_VISIBILITIES.PRIVATE
  );
  const [createUserPlaylist, { isLoading }] = useCreateUserPlaylistMutation();

  const handleSubmit = async () => {
    try {
      await createUserPlaylist({ title, visibility });
      toast.success("新增清單成功");
    } catch (error) {
      console.log(error);
      toast.error("新增清單失敗");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <div
        className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center bg-[#f2f2f2]"
        onClick={() => setOpen(true)}
      >
        <Plus className="w-4 h-4" />
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="新增播放清單"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <div className="mb-3">
          <label className="block text-[#21212] text-sm font-medium mb-1">
            標題
          </label>
          <input
            type="text"
            placeholder="影片標題"
            className="w-full p-3 rounded-md border border-[#E5E5E5] text-[#212121] outline-[#6784F6]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="pb-3">
          <div className="mb-3">
            <label className="block text-[#21212] text-sm font-medium ">
              瀏覽權限
            </label>
          </div>
          <div className="flex flex-col gap-3">
            {PLAYLIST_VISIBILITY_OPTIONS.map((option) => (
              <div
                key={option.value}
                onClick={() => setVisibility(option.value)}
                className={`px-4 py-4 border-1  rounded-md flex items-center gap-3 cursor-pointer ${
                  visibility === option.value
                    ? "bg-[#6784F6]/5 border-[#6784F6]"
                    : "border-[#E5E5E5]"
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 bg-white rounded-full ${
                    visibility === option.value
                      ? "border-5 border-[#6784F6]"
                      : "border-1 border-[#D5D5D5]"
                  }`}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium">
                    {option.label}
                  </span>
                  <span className="text-[13px] text-[#545454]">
                    {option.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default NewPlaylist;
