"use client";

import Navbar from "@/features/Navbar";
import { CloudUpload } from "lucide-react";
import { motion } from "framer-motion";

const UploadVideoPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 fixed left-0 right-0 bottom-0 top-0">
        <div className="relative w-[100px] h-[100px] flex items-center justify-center bg-[#ECEFFB] rounded-full">
          {/* Water Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#ECEFFB]"
            style={{ zIndex: 0, background: "none" }}
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeOut", delay: 0 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-[#ECEFFB]"
            style={{ zIndex: 0, background: "none" }}
            animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeOut", delay: 0.5 }}
          />
          <CloudUpload className="text-[#6784F6] w-10 h-10" />
        </div>
        <div className="flex flex-col items-center justify-center gap-1 px-8 text-center">
          <h3 className="font-medium text-[#232323]">
            Drag & Drop the video file here
          </h3>
          <p className="text-sm font-medium text-[#646464]">
            Your video will remain private until it is published.
          </p>
        </div>
        <button className="bg-[#6784F6] text-white px-4 py-3 rounded-full font-medium ">
          Select File
        </button>
      </div>
    </>
  );
};

export default UploadVideoPage;
