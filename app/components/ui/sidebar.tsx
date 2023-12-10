'use client'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaBook } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { MdContentPaste } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { useState } from 'react';

const SideBar = () => 
{
    const [collapsed, setCollapsed] = useState(false);

    return(
        <div style={{display:'flex',height:"100%",minHeight:'400px'}}>
            <Sidebar
                backgroundColor='#28292b'
                collapsed={collapsed}
            >
            <Menu>
                <main style={{ padding: 10 }}>
                <div>
                <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                    Collapse
                </button>
                </div>
                </main>
            </Menu>
            <Menu
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  if (level === 0) {
                    return {
                      backgroundColor: active ? "#ffff" : undefined,
                      "&:hover": {
                         backgroundColor: "#335B8C !important",
                         color: "white",
                         fontWeight: "bold !important"
                       },
                    };
                  }
                },
              }}>
                <MenuItem icon={<FaBook/>}> Semester </MenuItem>
                <MenuItem icon={<IoIosSchool/>}> Department </MenuItem>
                <MenuItem icon={<PiStudent/>}>Students</MenuItem>
                <MenuItem icon={<MdContentPaste/>}> Content </MenuItem>
                <MenuItem icon={<MdAssignment/>}> Assignment </MenuItem>
                <MenuItem icon={<FaBookOpen/>}> Courses </MenuItem>
                <MenuItem icon={<FaUserFriends/>}>User</MenuItem>
            </Menu>
            </Sidebar>
  
        </div>

    )
}

export default SideBar