
const RowHeader = () => {
  return (
    <div className="flex gap-2 items-start px-2 py-1 border-b border-gray-200">
      <div className="relative w-30 text-sm font-bold text-gray-700 flex-shrink-0">
        Video
      </div>
      <div className="min-w-40 mr-auto px-2">
      </div>
      <div className="px-2 flex gap-1 overflow-x-auto">
        <div className="w-40 text-sm text-gray-700 font-bold shrink-0">舞種</div>
        <div className="w-40 text-sm text-gray-700 font-bold shrink-0">參與者</div>
        <div className="w-30 text-sm text-gray-700 font-bold shrink-0">類型</div>
        <div className="w-40 text-sm text-gray-700 font-bold shrink-0">地點</div>
        <div className="w-30 text-sm text-gray-700 font-bold shrink-0">
          日期
        </div>
      </div>
    </div>
  );
};

export default RowHeader;
