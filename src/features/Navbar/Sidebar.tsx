"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CloudUpload,
  House,
  SquarePlay,
  Heart,
  CircleUser,
} from "lucide-react";
import Link from "next/link";

const MENU_ITEMS = [
  {
    icon: House,
    label: "Home",
    href: "/",
  },
  {
    icon: SquarePlay,
    label: "My videos",
    href: "/video-management",
  },
  {
    icon: Heart,
    label: "Favorites",
    href: "/favorites",
  },
  {
    icon: CircleUser,
    label: "Profile",
    href: "/profile",
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img src="/icons/menu.svg" alt="Menu" onClick={() => setOpen(!open)} />
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            ></motion.div>
            <motion.div
              className="fixed top-0 bottom-0 left-0 z-50 rounded-r-2xl bg-white shadow-xl p-4 w-75 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            >
              <div className="flex items-center gap-1 mb-6">
                <img src="/icons/Logo.svg" alt="Logo" />
                <h4 className="text-xl font-bold tracking-tight">DanceLoop</h4>
              </div>
              <Link href="/upload-video">
                <div className="flex items-center justify-center align-center gap-2 py-3 border-1 text-[#6784F6] border-[#6784F6] rounded-full font-medium">
                  <CloudUpload />
                  <span>Upload Video</span>
                </div>
              </Link>
              <div className="border-b border-[#eeeeee] my-4"></div>
              <div className="flex flex-col gap-2">
                {MENU_ITEMS.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <div className="flex items-center gap-3 p-3 rounded-xl text-[#454545] font-medium">
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <X
                className="absolute right-4 top-4 w-6 h-6 cursor-pointer text-gray-600"
                onClick={() => setOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
