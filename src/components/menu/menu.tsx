import MenuItem from "@/components/menu/menu-item";
import { FaHouseChimneyWindow, FaList } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";

const menuItems = [
  { title: "Home", link: "/", icon: <FaHouseChimneyWindow /> },
  { title: "All Words", link: "/words", icon: <FaList /> },
  { title: "AI", link: "/ai", icon: <RiRobot2Fill size={22} /> },
];

export default function Menu() {
  return (
    <div className="fixed left-0 top-0 flex h-screen flex-col gap-y-2 bg-gray-50 p-2 text-sm shadow-md shadow-gray-500">
      {menuItems.map((menuItem, index) => (
        <MenuItem
          key={index}
          title={menuItem.title}
          link={menuItem.link}
          icon={menuItem.icon}
        />
      ))}
    </div>
  );
}
