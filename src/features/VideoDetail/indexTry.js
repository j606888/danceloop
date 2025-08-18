import { Stream } from "@cloudflare/stream-react";

export const VideoDetail = ({ videoUid }) => {
  return (
    <div className="absolute inset-0 z-50 bg-black">
      <Stream controls src={videoUid} width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
    </div>
  );
};

export default VideoDetail;