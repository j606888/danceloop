import { RefreshCcw } from "lucide-react";
import userVideosSlice, {
  useGetUserVideosQuery,
  useSyncUserVideosMutation,
} from "@/store/slices/user/videos";
import { useCallback, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

const SyncVideo = () => {
  const dispatch = useDispatch();
  const [shouldSync, setShouldSync] = useState(false);
  const { data, isLoading } = useGetUserVideosQuery({ state: "PROCESSING" });
  const [syncUserVideos] = useSyncUserVideosMutation();

  const handleSyncVideo = useCallback(async () => {
    const { success, unreadyVideoIds } = await syncUserVideos().unwrap();
    if (success) {
      setShouldSync(false);
      dispatch(userVideosSlice.util.invalidateTags(["Video"]));
    } else {
      console.log({ unreadyVideoIds });
    }
  }, [syncUserVideos, dispatch]);

  useEffect(() => {
    if (!shouldSync) return;
    const interval = setInterval(() => {
      handleSyncVideo();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleSyncVideo, shouldSync]);

  useEffect(() => {
    if (data?.result?.length && data?.result?.length > 0) {
      setShouldSync(true);
    }
  }, [data]);

  const processingVideos = data?.result;

  if (isLoading || processingVideos?.length === 0 || !shouldSync) return null;

  return (
    <div>
      <RefreshCcw className="w-5 h-5 text-gray-500 animate-spin [animation-duration:2s]" />
    </div>
  );
};

export default SyncVideo;
