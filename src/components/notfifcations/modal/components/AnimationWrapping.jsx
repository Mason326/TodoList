import { motion } from "framer-motion";

export function AnimationWrapping({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {children}
    </motion.div>
  );
}
