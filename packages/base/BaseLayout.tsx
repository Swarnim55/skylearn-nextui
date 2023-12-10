'use client';
import React from 'react';

const BaseLayout = ({ title, children }) => {
  return (
    <>
      <div className="text-4xl font-semibold text-gray-900 dark:text-white m-5 p-5">
        {title || ''}
      </div>
      <div>{children}</div>
    </>
  );
};

export default BaseLayout;
