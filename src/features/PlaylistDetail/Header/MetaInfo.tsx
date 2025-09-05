import { Dot } from "lucide-react";

const MetaInfo = () => {
  return (
    <div className="flex items-center gap-1 text-sm text-[#999999]">
      <span>不公開</span>
      <Dot className="w-4 h-4" strokeWidth={5}/>
      <span>8 部影片</span>
    </div>
  );
};

export default MetaInfo;