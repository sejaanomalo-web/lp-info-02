"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function Reveal({ children, className = "", delay = 0, once = true }) {
  return (
    <motion.div
      className={className}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
