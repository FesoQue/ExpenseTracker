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
      <div className='container'>History</div>
    </motion.div>
  );
};

export default History;
