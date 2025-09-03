import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

const Drawer = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (open) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose()}
          ></motion.div>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl p-4"
          >
            <h2 className="sticky top-0 text-lg font-bold w-full text-center pb-2 bg-white border-b border-[#E5E5E5]">
              Dancers
            </h2>
            <div className="pt-4 not-only-of-type:h-[70vh] overflow-y-auto">
              {children}
            </div>
            <div className="absolute top-5 right-5">
              <X
                className="w-5 h-5 cursor-pointer text-gray-600"
                onClick={() => onClose()}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
