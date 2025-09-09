"use client";

import {
  useGetUserPlaylistQuery,
  useGetUserPlaylistVideosQuery,
} from "@/store/slices/user/playlists";
import Header from "./Header";
import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import PlaylistDetailSkeleton from "./PlaylistDetailSkeleton";
import VideoListSkeleton from "@/components/skeletons/VideoListSkeleton";
import useMember from "@/hooks/useMember";

const PlaylistDetail = ({ publicId }: { publicId: string }) => {
  const { data: playlist, isLoading } = useGetUserPlaylistQuery({ publicId });
  const { isOwner, isCollaborator } = useMember(playlist);
  const { data: videos, isLoading: isVideosLoading } =
    useGetUserPlaylistVideosQuery({ publicId });
  const from = `/playlists/${publicId}`;

  return (
    <>
      {isLoading || !playlist ? (
        <PlaylistDetailSkeleton />
      ) : (
        <Header playlist={playlist} videoCount={videos?.result?.length || 0} />
      )}
      {isVideosLoading || !playlist ? (
        <div className="flex flex-col">
          <VideoListSkeleton />
          <VideoListSkeleton />
          <VideoListSkeleton />
        </div>
      ) : (
        <div>
          {videos?.result?.length && videos?.result?.length > 0 ? (
            <div className="p-2">
              {videos?.result?.map((video) => (
                <div className="flex" key={video.id}>
                  <VideoCard key={video.id} video={video} from={from} />
                </div>
              ))}
            </div>
          ) : (
            <div className="fixed left-0 right-0 top-[calc(52px+152px)] bottom-0 flex justify-center items-center flex-col gap-3">
              <img src="/no-data.svg" alt="no data" className="w-1/2" />
              {isOwner || isCollaborator ? (
                <>
                  <div className="flex flex-col gap-1 text-center">
                    <h4>尚未有影片</h4>
                    <p className="text-[#777777]">
                      新增影片到這個清單，即可立即觀看
                    </p>
                  </div>
                  <Link
                    href={`/playlists/${playlist.publicId}/add-video`}
                    className="text-white bg-[#6784F6] rounded-full px-4 py-2"
                  >
                    立即新增
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1 text-center">
                    <h4>尚未有影片</h4>
                    <p className="text-[#777777]">
                      等待創作者新增影片
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PlaylistDetail;
