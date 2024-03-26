import MenuItem from "@/components/menu/menu-item";
import { FaHouseChimneyWindow, FaList } from "react-icons/fa6";

const menuItems = [
  { title: "Home", link: "/", icon: <FaHouseChimneyWindow /> },
  { title: "All Words", link: "/words", icon: <FaList /> },
];

export default function Menu() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-48 flex-col bg-primary-50 shadow-md shadow-gray-500 text-sm">
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
