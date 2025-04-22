"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
  finalCount?: number;
}

export default function LoadingScreen({
  onLoadingComplete,
  duration = 3000,
  finalCount = 100,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(() => {
            setIsComplete(true);
            onLoadingComplete?.();
          }, 1200); // Allow time for exit animation
          return 100;
        }
        return prev + 1;
      });

      setCounter((prev) => {
        // Calculate the next counter value based on the progress percentage
        const targetValue = Math.floor((finalCount * progress) / 100);
        // Ensure the counter doesn't jump too quickly
        const increment = Math.max(1, Math.floor(finalCount / 50));
        const newValue = Math.min(targetValue, prev + increment);
        return newValue > finalCount ? finalCount : newValue;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete, finalCount, progress]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <div className="flex items-center justify-center flex-grow">
            <div className="w-full max-w-md px-4">
              <motion.div
                className="relative w-full h-1 overflow-hidden bg-neutral-800"
                animate={
                  isExiting
                    ? {
                        height: "200vh",
                        width: "200vw",
                        x: "-50vw",
                        y: "-100vh",
                        transition: {
                          duration: 1.2,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                    : {}
                }
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${progress}%`,
                    height: isExiting ? "200vh" : "100%",
                  }}
                  transition={{
                    width: { ease: "easeInOut" },
                    height: {
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    },
                  }}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute font-light text-white font-bricolage bottom-16 left-16 text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -20 : 0 }}
            transition={{
              opacity: { duration: 0.4 },
              y: { duration: 0.4 },
            }}
          >
            {counter.toString().padStart(3, "0")}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
