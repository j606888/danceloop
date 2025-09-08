const VideoListSkeleton = () => {
  return (
    <div className="flex p-2 gap-3 animate-pulse">
      <div className="flex items-center justify-center w-[92px] h-[120px] bg-gray-200"></div>
      <div className="flex flex-col gap-3 py-3">
        <div className="h-3 rounded bg-gray-200 w-20"></div>
        <div className="h-3 rounded bg-gray-200 w-40"></div>
        <div className="h-3 rounded bg-gray-200 w-20"></div>
        <div className="flex gap-2">
          <div className="h-5 rounded-full bg-gray-200 w-12"></div>
          <div className="h-5 rounded-full bg-gray-200 w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoListSkeleton;