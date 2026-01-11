'use client';

import { motion } from 'framer-motion';

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Scroll to explore
      </span>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
        style={{ borderColor: 'var(--color-text-muted)' }}
      >
        <motion.div
          animate={{
            opacity: [1, 0],
            y: [0, 12],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--color-primary)' }}
        />
      </motion.div>
    </motion.div>
  );
}
