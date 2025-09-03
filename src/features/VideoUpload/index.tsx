import { useState, useEffect, useReducer } from "react";
import { useUpdateUserVideoMutation } from "@/store/slices/user/videos";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  initialDraft,
  videoDraftReducer,
  bindSetField,
} from "./videoDraft";


const toRecordedAt = (date: string, time: string) => {
  if (!date || !time) return null;
  const d = new Date(`${date}T${time}`);
  return d.toISOString();
};

const VideoUpload = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoUid, setVideoUid] = useState<string | null>(null);
  const [draft, dispatch] = useReducer(videoDraftReducer, initialDraft);
  const setField = bindSetField(dispatch);
  const [updateUserVideo] = useUpdateUserVideoMutation();

  const handleSubmit = async () => {
    const payload = {
      title: draft.title.trim(),
      danceStyle: draft.danceStyle || undefined,
      recordType: draft.recordType || undefined,
      recordedAt: toRecordedAt(draft.recordedDate, draft.recordedTime),
      dancerIds: draft.dancerIds,
      visibility: draft.visibility,
    };

    if (!videoUid) return;

    await updateUserVideo({ uid: videoUid, data: payload });

    dispatch({ type: "RESET" });
    setStep(0);
  };

  const handleStep0Next = (uid: string) => {
    setVideoUid(uid);
    setStep(1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((progress) => {
        if (progress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return progress + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {step === 0 && <Step0 onNext={handleStep0Next} />}
      {step === 1 && (
        <Step1
          progress={progress}
          draft={draft}
          setField={setField}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          progress={progress}
          draft={draft}
          setField={setField}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3
          progress={progress}
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
