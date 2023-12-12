'use client';
import React from 'react';

const BaseLayout = ({ title, children }) => {
  return (
    <>
      <div className="text-4xl font-semibold  dark:text-white m-5 p-5">
        {title || ''}
      </div>
      <div className="mt-5">{children}</div>
    </>
  );
};

export default BaseLayout;
