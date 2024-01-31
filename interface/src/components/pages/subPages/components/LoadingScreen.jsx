import React, { useState, useEffect } from 'react';
import back from '../../../media/loading/back.png';
import front from '../../../media/loading/front.png';
import redFront from '../../../media/loading/front-red.png';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className={`fixed z-10 top-0 left-0 w-screen h-screen flex items-center justify-center ${loading ? 'block' : 'hidden'}`}>
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-white bg-opacity-30"></div>
      <div className="modal-overlay absolute inset-0 backdrop-blur-[1px] bg-black bg-opacity-10"></div>
      <div className='flex justify-center items-center'>
        <img src={back} className='absolute h-32' />
        <img src={front} className='absolute h-32' />
        <img
          src={redFront}
          className={`absolute h-32 ${animationComplete ? 'diagonal-fill' : 'hidden'}`}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
