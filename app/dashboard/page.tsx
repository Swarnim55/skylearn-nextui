'use client';
import React, { useEffect } from 'react';
import RootLayout from '../layout';
import Layout from './layout';
import { useTheme } from 'next-themes';

const Dashboard = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme('light');
  }, []);
  return <div>Dashboard Page</div>;
};

export default Dashboard;
