'use client';
import { useRouter } from 'next/navigation';
import {  useMemo, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { FaBook, FaBookOpen, FaUserFriends } from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import { MdAssignment, MdContentPaste } from 'react-icons/md';
import { FaUsers } from "react-icons/fa6"
import { PiStudent } from 'react-icons/pi';
import { Menu, MenuItem, Sidebar, sidebarClasses } from 'react-pro-sidebar';
import React from 'react';
import { useTheme } from 'next-themes';

const SideBar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const bgColor = useMemo(() => {
    if (theme) {
      return theme === 'dark' ? '#000' : '#fff';
    }
    return 'inherit';
  }, [theme]);

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  // Update the active menu item based on the current route

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <Sidebar
      collapsed={collapsed}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: bgColor,
        },
      }}
    >
      <Menu closeOnClick>
        <MenuItem
          icon={<BiMenuAltRight />}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          style={{ textAlign: 'center' }}
        >
          SKYLEARN
        </MenuItem>
        <MenuItem
          icon={<FaBook />}
          active={activeMenuItem === 'Dashboard'}
          onClick={() => {
            handleMenuItemClick('Dashboard');
            router.push('/dashboard/');
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          icon={<IoIosSchool />}
          active={activeMenuItem === 'Department'}
          onClick={() => {
            handleMenuItemClick('Department');
            router.push('/dashboard/departments');
          }}
        >
          Departments
        </MenuItem>
        <MenuItem
          icon={<PiStudent />}
          active={activeMenuItem === 'Students'}
          onClick={() => {
            handleMenuItemClick('Students');
            router.push('/dashboard/students');
          }}
        >
          Students
        </MenuItem>
        <MenuItem
          icon={<MdContentPaste />}
          active={activeMenuItem === 'Content'}
          onClick={() => {
            handleMenuItemClick('Content');
            router.push('/dashboard/content');
          }}
        >
          Content
        </MenuItem>
        <MenuItem
          icon={<MdAssignment />}
          active={activeMenuItem === 'Assignment'}
          onClick={() => {
            handleMenuItemClick('Assignment');
            router.push('/dashboard/assignments');
          }}
        >
          Assignments
        </MenuItem>
        <MenuItem
          icon={<FaBookOpen />}
          active={activeMenuItem === 'Courses'}
          onClick={() => {
            handleMenuItemClick('Courses');
            router.push('/dashboard/courses');
          }}
        >
          Courses
        </MenuItem>
        <MenuItem
          icon={<FaUserFriends />}
          active={activeMenuItem === 'User'}
          onClick={() => {
            handleMenuItemClick('User');
            router.push('/dashboard/users');
          }}
        >
          User
        </MenuItem>
        <MenuItem
          icon={<FaUsers />}
          active={activeMenuItem === 'Staff'}
          onClick={() => {
            handleMenuItemClick('Staff');
            router.push('/dashboard/staff');
          }}
        >
          Staff
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
