import { useState, useEffect } from "react";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const VideoUpload = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

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
      {step === 0 && <Step0 onNext={() => setStep(1)} />}
      {step === 1 && <Step1 progress={progress} onNext={() => setStep(2)} />}
      {step === 2 && <Step2 progress={progress} onNext={() => setStep(3)} />}
      {step === 3 && <Step3 />}
    </div>
  )
}

export default VideoUpload;