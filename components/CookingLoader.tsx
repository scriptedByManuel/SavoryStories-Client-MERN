"use client";

import { motion } from "framer-motion";

export default function CookingLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative w-24 h-24">
        {/* Pan Handle */}
        <div className="absolute bottom-0 left-[-20px] w-12 h-2 bg-zinc-800 rounded-full rotate-[-30deg]" />
        
        {/* Pan Body */}
        <div className="absolute bottom-0 w-20 h-5 bg-zinc-800 rounded-b-xl border-t-2 border-zinc-700" />

        {/* The Jumping Food (Pancake/Egg) */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-6 bottom-6 w-8 h-8 bg-yellow-400 rounded-lg shadow-inner border-2 border-yellow-500"
        />

        {/* Pan Steam / Smoke */}
        <div className="flex space-x-2 absolute top-4 left-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1 h-3 bg-zinc-300 rounded-full blur-[1px]"
            />
          ))}
        </div>
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-black italic tracking-tighter text-primary animate-pulse">
          COOKING...
        </h3>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          Preparing something delicious
        </p>
      </div>
    </div>
  );
}