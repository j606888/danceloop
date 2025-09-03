import { useCreateUserVideoMutation } from "@/store/slices/user/videos";

const Step0 = ({ onNext }: { onNext: (uid: string) => void }) => {
  const [createVideo] = useCreateUserVideoMutation();

  const handleUploadVideo = () => {
    // Need to upload video later
    handleCreateVideo();
  };

  const handleCreateVideo = async () => {
    const randomUid = crypto.randomUUID();
    const video = await createVideo({ uid: randomUid }).unwrap();
    onNext(video.uid);
  };

  return (
    <div className="absolute top-[56px] left-0 right-0 bottom-0 flex flex-col items-center justify-center ">
      <img
        src="/icons/rounded-upload.svg"
        alt="Rounded Upload"
        className="mb-5"
      />
      <h3 className="font-semibold mb-1">選擇要上傳的影片</h3>
      <p className="text-sm text-[#444444] mb-5">
        在選擇公開前你的影片都會是私人狀態
      </p>
      <button
        className="bg-[#6784F6] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
        onClick={handleUploadVideo}
      >
        選取檔案
      </button>
    </div>
  );
};

export default Step0;
