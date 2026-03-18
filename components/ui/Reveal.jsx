"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.19, 1, 0.22, 1]
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
      viewport={{ once, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
