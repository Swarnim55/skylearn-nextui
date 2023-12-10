'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { FaBook, FaBookOpen, FaUserFriends } from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import { MdAssignment, MdContentPaste } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import React from 'react';
import { NavbarBrand } from '@nextui-org/navbar';
import NextLink from 'next/link';
const SideBar = () => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  // Update the active menu item based on the current route

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <Sidebar collapsed={collapsed}>
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
          onClick={() => handleMenuItemClick('Dashboard')}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          icon={<IoIosSchool />}
          active={activeMenuItem === 'Department'}
          onClick={() => {
            handleMenuItemClick('Department');
            router.push('/departments');
          }}
        >
          Department
        </MenuItem>
        <MenuItem
          icon={<PiStudent />}
          active={activeMenuItem === 'Students'}
          onClick={() => handleMenuItemClick('Students')}
        >
          Students
        </MenuItem>
        <MenuItem
          icon={<MdContentPaste />}
          active={activeMenuItem === 'Content'}
          onClick={() => handleMenuItemClick('Content')}
        >
          Content
        </MenuItem>
        <MenuItem
          icon={<MdAssignment />}
          active={activeMenuItem === 'Assignment'}
          onClick={() => handleMenuItemClick('Assignment')}
        >
          Assignment
        </MenuItem>
        <MenuItem
          icon={<FaBookOpen />}
          active={activeMenuItem === 'Courses'}
          onClick={() => handleMenuItemClick('Courses')}
        >
          Courses
        </MenuItem>
        <MenuItem
          icon={<FaUserFriends />}
          active={activeMenuItem === 'User'}
          onClick={() => handleMenuItemClick('User')}
        >
          User
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
