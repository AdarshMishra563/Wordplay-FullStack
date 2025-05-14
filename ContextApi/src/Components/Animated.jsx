import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


const AnimatedText = ({ text }) => {
const [isMobile,setIsMobile]=useState(false);



useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 786);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        background: ' #222',
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          fontSize: `${isMobile ? '4rem' : '7rem'}`,
          fontWeight: '700',
          background: 'linear-gradient(90deg, #d1d5db, #9ca3af, #f3f4f6, #9ca3af, #d1d5db)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '300% 300%',
          animation: 'shine 4s linear infinite',
        }}
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child}>
            {letter}
          </motion.span>
        ))}
       
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: letters.length * 0.08 + 0.6, 
          }}
          style={{
            marginLeft: '12px',
            animation: 'blink 1s step-start infinite',
          }}
        >
          _
        </motion.span>
      </motion.div>
    </div>
  );
};

export default AnimatedText;
