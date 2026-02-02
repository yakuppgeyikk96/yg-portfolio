"use client";

import { motion } from "motion/react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <div
        className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted/40 p-1.5"
        aria-hidden="true"
      >
        <motion.div
          className="h-2 w-1 rounded-full bg-primary"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
