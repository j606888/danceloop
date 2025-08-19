import { Button } from "@mui/material";
import {
  useSyncVideosMutation,
  useGetVideosQuery,
} from "@/store/slices/admin/video";
import VideoRow from "./VideoRow";
import RowHeader from "./RowHeader";

const AdminVideoList = () => {
  const [syncVideos, { isLoading }] = useSyncVideosMutation();
  const { data: videos, isLoading: isVideosLoading } = useGetVideosQuery();

  const handleSyncVideos = () => {
    syncVideos();
  };

  if (isVideosLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSyncVideos}
          disabled={isLoading}
        >
          Sync Videos
        </Button>
      </div>
      <RowHeader />
      <div className="flex flex-col">
        {videos.map((video) => (
          <VideoRow key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default AdminVideoList;
