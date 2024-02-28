import React, { useState } from 'react';

const Popover = ({ title, text, subTitle, subText, visible }) => {

  return (
    <>
      <div className="relative z-50 w-fit">
        <div className="w-full">
          <div className={`absolute bg-gray-700 rounded-lg px-4 py-2 end-0 ${visible ? 'block' : 'hidden'} text-white`}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popover;