"use client";
import React from "react";
import { useRouter } from "next/navigation";
import sideBarContent from "../content";
import { RiMenu2Line } from "react-icons/ri";

const Sidebar = ({ isSidebarExpanded, toggleSidebar, activeItem, setActiveItem }) => {
  const router = useRouter();

  const handleItemClick = (label, link) => {
    setActiveItem(label);
    router.push(link);
  };

  return (
    <aside
    className={`fixed top-0 left-0 h-screen bg-[#0052b4] p-4 z-50 transition-all duration-200 ${
      isSidebarExpanded ? "w-64" : "w-20"
    }`}
  >
  
    
      <button onClick={toggleSidebar} className="mb-4 ml-2">
        <RiMenu2Line className="text-2xl text-blue-200" />
      </button>

      <nav className="space-y-4">
  {sideBarContent.map((item, index) => (
    <div key={item.link}>
      {index === 7 && isSidebarExpanded && (
        <h4 className="text-white text-md ml-4 mt-4">User</h4>
      )}
      <button
        className={`group flex items-center space-x-4 p-3 w-full rounded-2xl transition-all duration-200 
          ${
            activeItem === item.label
              ? "bg-white text-[#0052b4]"
              : "text-white hover:bg-white hover:text-[#0052b4]"
          }`}
        onClick={() => handleItemClick(item.label, item.link)}
      >
        <item.icon
          className={`text-xl transition-all duration-200  ${
            activeItem === item.label
              ? "text-[#0052b4]"
              : "text-white group-hover:text-[#0052b4]"
          }`}
        />
        {isSidebarExpanded && (
          <span className="text-[15px]">{item.label}</span>
        )}
      </button>
    </div>
  ))}
</nav>

    </aside>
  );
};

export default Sidebar;

