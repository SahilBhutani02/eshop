import { MdDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaBoxOpen } from "react-icons/fa6";

export const SidebarRoutes = [
  {
    path: `/dashboard`,
    name: "Dashboard",
    to: `/dashboard`,
    icon: <MdDashboard />,
  },
  {
    path: `/users`,
    name: "Users",
    to: `/users`,
    icon: <PiUsersThreeFill />,
  },
  {
    path: `/products`,
    name: "Products",
    to: `/products`,
    icon: <FaBoxOpen />,
  },
];
