"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import LoadingScreen from "@/components/loading-screen";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen
        onLoadingComplete={() => setLoading(false)}
        duration={4000}
        finalCount={83}
      />

      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="min-h-screen"
            exit={{
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
