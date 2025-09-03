import { useState, useReducer, useCallback, useEffect } from "react";
import { useUpdateUserVideoMutation, useCreateUserVideoMutation } from "@/store/slices/user/videos";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import useUpload from "./useUpload";
import { initialDraft, videoDraftReducer, bindSetField } from "./videoDraft";
import { useRouter } from "next/navigation";

const toRecordedAt = (date: string, time: string) => {
  if (!date || !time) return null;
  const d = new Date(`${date}T${time}`);
  return d.toISOString();
};

const VideoUpload = () => {
  const [step, setStep] = useState(0);
  const [draft, dispatch] = useReducer(videoDraftReducer, initialDraft);
  const setField = bindSetField(dispatch);
  const [updateUserVideo] = useUpdateUserVideoMutation();
  const {
    file,
    preview,
    progress,
    status,
    mediaId,
    onSelect,
  } = useUpload();
  const [createVideo] = useCreateUserVideoMutation();
  const router = useRouter();
  const handleSubmit = async () => {
    const payload = {
      title: draft.title.trim(),
      danceStyle: draft.danceStyle || undefined,
      recordType: draft.recordType || undefined,
      recordedAt: toRecordedAt(draft.recordedDate, draft.recordedTime),
      dancerIds: draft.dancerIds,
      visibility: draft.visibility,
      state: "PROCESSING",
    };

    if (!mediaId) return;

    await updateUserVideo({ uid: mediaId, data: payload });
    router.push("/video/management");

  };

  const handleStep0Next = useCallback(() => {
    setStep(1);
  }, [setStep]);

  useEffect(() => {
    if (mediaId) {
      createVideo({ uid: mediaId })
    }
  }, [mediaId, createVideo])

  return (
    <div>
      {step === 0 && (
        <Step0
          mediaId={mediaId}
          file={file}
          draft={draft}

          onSelect={onSelect}
          setField={setField}
          onNext={handleStep0Next}
        />
      )}
      {step === 1 && (
        <Step1
          progress={progress}
          status={status}
          preview={preview}
          draft={draft}
          setField={setField}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          progress={progress}
          status={status}
          preview={preview}
          draft={draft}
          setField={setField}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3
          progress={progress}
          status={status}
          preview={preview}
          draft={draft}
          setField={setField}
          onBack={() => setStep(2)}
          onNext={handleSubmit}
        />
      )}
      {step === 4 && <div className="p-5">填寫完成，剩下還在做</div>}
    </div>
  );
};

export default VideoUpload;
