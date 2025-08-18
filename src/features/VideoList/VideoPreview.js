import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

const VideoPreview = ({ video }) => {
  const duration = format(video.duration * 1000, 'm:ss')
  const router = useRouter()

  return <div className="relative h-[180px] bg-gray-600 overflow-hidden cursor-pointer" onClick={() => router.push(`/video/${video.uid}`)}>
    <img src={video.thumbnail} alt={video.uid} className="w-full h-full object-cover" />
    <div className="absolute bottom-0 right-0 text-white p-1 text-sm font-medium">{duration}</div>
  </div>;
};

export default VideoPreview;