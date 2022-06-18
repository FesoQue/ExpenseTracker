import React from 'react';
import { motion } from 'framer-motion';
import { animatePages, transition } from '../animation/animate';

const History = () => {
  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={animatePages}
      transition={transition}
    >
      History
    </motion.div>
  );
};

export default History;
