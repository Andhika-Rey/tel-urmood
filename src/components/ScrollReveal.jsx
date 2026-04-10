import { motion } from 'framer-motion';

const defaultVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variants = defaultVariants,
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
