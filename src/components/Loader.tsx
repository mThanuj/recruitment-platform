"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="w-screen h-screen z-50 fixed top-0 left-0 bg-black flex items-center justify-center gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          className="size-6 bg-white rounded-full"
          initial={{ y: 0, opacity: 0.3 }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
