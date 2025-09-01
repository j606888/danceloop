"use client";

import { DotLoader, HashLoader, SkewLoader } from "react-spinners";
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useSyncVideoMutation,
  useUpdateVideoStateMutation,
} from "@/store/slices/videos";

const contentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: [12, -2, 0],
    transition: { duration: 0.42 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25 },
  },
};

const groupVariants = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const UploadToast = ({
  videoUid,
  uploadProgress,
  uploadSuccess,
}: {
  videoUid: string;
  uploadProgress: number;
  uploadSuccess: boolean;
}) => {
  const [step, setStep] = useState(1);
  const [needSync, setNeedSync] = useState(true);
  const [syncVideo] = useSyncVideoMutation();
  const [updateVideoState] = useUpdateVideoStateMutation();

  const handleSyncVideo = useCallback(async () => {
    const { ready } = await syncVideo({ uid: videoUid }).unwrap();
    if (ready) {
      setNeedSync(false);
      setStep(3);
    }
  }, [syncVideo, videoUid]);

  useEffect(() => {
    if (uploadProgress === 100 && uploadSuccess && step === 1) {
      setStep(2);
      updateVideoState({ uid: videoUid, state: "PROCESSING" });
    }
  }, [uploadProgress, uploadSuccess, step, updateVideoState, videoUid]);

  useEffect(() => {
    if (!needSync) return;

    const timeout = setInterval(() => {
      handleSyncVideo();
    }, 5000);

    return () => clearInterval(timeout);
  }, [needSync, syncVideo, handleSyncVideo]);

  return (
    <AnimatePresence>
      {step !== 4 && (
        <div className="flex p-4 bg-[#FFFBF4] rounded-full shadow-[2px_2px_12px_0px_rgba(239,194,47,0.50)]">
          <div className="flex items-center gap-5 w-full">
            {/* Inner step switch with float up/down effect */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step} // important: key by step to trigger exit/enter
                variants={groupVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center gap-5 w-full"
              >
                {/* ICON */}
                <motion.div
                  variants={contentVariants}
                  className="w-8 flex-1 flex items-center justify-center"
                >
                  {step === 1 && <DotLoader color="#EFC22F" size={32} />}
                  {step === 2 && <HashLoader color="#EFC22F" size={30} />}
                  {(step === 3 || step === 4) && (
                    <SkewLoader color="#EFC22F" size={12} />
                  )}
                </motion.div>

                {/* TEXT BLOCK */}
                <motion.div
                  variants={contentVariants}
                  className="flex flex-col gap-0.5 w-full justify-center"
                >
                  {step === 1 && (
                    <>
                      <p className="text-xs font-semibold text-[#B48E14]">
                        Video Uploading
                      </p>
                      <ProgressBar value={uploadProgress} />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <p className="text-xs font-semibold text-[#B48E14]">
                        Processing Video
                      </p>
                      <p className="text-xs text-[#B48E14]/80">
                        Should take 30 ~ 60 seconds
                      </p>
                    </>
                  )}
                  {(step === 3 || step === 4) && (
                    <>
                      <p className="text-xs font-semibold text-[#B48E14]">
                        Upload Completed
                      </p>
                      <p className="text-xs text-[#B48E14]/80">
                        You can continue to fill the form
                      </p>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UploadToast;
