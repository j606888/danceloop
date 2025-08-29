"use client";

import { DotLoader, HashLoader, SkewLoader } from "react-spinners";
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const contentVariants = {
  initial: { opacity: 0, y: 12 /*, filter: "blur(2px)" */ },
  animate: {
    opacity: 1,
    // float up slightly past target, then settle down
    y: [12, -2, 0],
    transition: { duration: 0.42 },
  },
  exit: {
    opacity: 0,
    y: -12, // float up and out
    transition: { duration: 0.25 },
  },
};

// Optional: stagger inner bits (icon then text)
const groupVariants = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const UploadToast = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 20);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 100 && step === 1) {
      setStep(2);
      setTimeout(() => setStep(3), 5000);
      setTimeout(() => setStep(4), 10000);
    }
  }, [progress, step]);

  return (
    <AnimatePresence>
      {step !== 4 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          // layout animates height if your content height differs per step
          layout
          className="fixed bottom-5 left-5 right-5 z-50 flex p-4 bg-[#FFFBF4] rounded-full shadow-[2px_2px_12px_0px_rgba(239,194,47,0.50)] transform-gpu"
        >
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
                <motion.div variants={contentVariants} className="w-8 flex-1 flex items-center justify-center">
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
                      <ProgressBar value={progress} />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadToast;
