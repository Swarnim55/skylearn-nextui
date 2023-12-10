import { BiSolidBookContent } from "react-icons/bi";
import { MdDashboard, MdOutlineAssignment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { getPageRoute } from "./getRoutes";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { LuCalendarClock } from "react-icons/lu";
export const sideBarConfig = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    link: "/dashboard",
  },
  {
    title: "Content",
    icon: BiSolidBookContent,
    link: getPageRoute("CONTENT"),
  },
  {
    title: "Users",
    icon: FaUsers,
    link: getPageRoute("USERS"),
  },
  {
    title: "Roles",
    icon: RiUserSettingsLine,
    link: getPageRoute("ROLES"),
  },
  {
    title: "Departments",
    icon: AiOutlineDeploymentUnit,
    link: getPageRoute("DEPARTMENTS"),
  },
  {
    title: "Semester",
    icon: LuCalendarClock,
    link: getPageRoute("SEMESTER"),
  },
  {
    title: "Assignments",
    icon: MdOutlineAssignment,
    link: getPageRoute("ASSIGNMENTS"),
  },
];
