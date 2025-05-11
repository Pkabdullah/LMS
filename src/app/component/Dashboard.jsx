"use client";

import { useState, useEffect } from "react";
import CountUp from "react-countup";
import sideBarContent from "../content";
import { FcMenu } from "react-icons/fc";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { resetUser } from "../RTK/userslice";
import AdminHomePage from "../Admins/AdminHomePage";
import AdminProfile from "../Admins/AdminProfile";
import Unauthorized from "@/components/ui/Unauthorized";
import { ToastContainer, toast } from "react-toastify";
const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log("active route", activeItem);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch;
  const router = useRouter();
  const pathName= usePathname()
  
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const handleLogout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/AdminLogout`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      toast.success("Logged out successfully!");
      router.replace("/");
      router.refresh();
      dispatch(resetUser());
    } else {
      toast.error("Logout failed!");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        if (isAuthenticated !== false) router.replace("/");
      }
    };

    checkAuth();
  }, [router, isAuthenticated]);

  if (!isAuthenticated) {
    return <Unauthorized />;
  }
  const StatsCard = ({ title, end }) => (
    <div className="flex gap-2">
      <h3 className="text-2xl text-[#2e9916] font-semibold">{title}</h3>
      <CountUp
        start={0}
        end={end}
        duration={2.5}
        separator=","
        className="text-3xl text-[#2e9916] font-bold"
      >
        $
      </CountUp>
    </div>
  );
  return (
    <div className="flex h-screen bg-[#ffffff] ">
      {/* Sidebar */}
      <aside
        className={`bg-[#f5f1eb] h-screen p-4 transition-all duration-200 ${
          isSidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        <button onClick={toggleSidebar} className="mb-2 ml-3">
          <FcMenu className=" text-xl" />
        </button>
        <nav className="space-y-1.5">
          {sideBarContent.map((item, index) => (
            <>
              <div className={`${!isSidebarExpanded ? "hidden" : ""}`}>
                {index === 7 && (
                  <h4 className="text-[#3b3b3b] text-md ml-4 mt-4">User</h4>
                )}
              </div>

              <button
                key={index}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:bg-[#e8d8c3] ${
                  activeItem === index
                    ? "bg-[#d9b99b] text-black"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  handleItemClick(index);
                  setActiveItem(item.label);
                }}
              >
                <item.icon className="text-xl" />
                {isSidebarExpanded && (
                  <span className="text-[15px]">{item.label}</span>
                )}
              </button>
            </>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-6 ">
        <nav className="bg-[#d9b99b] p-4 shadow flex justify-between items-center">
          {/* <h2>{user.admin.schoolName}</h2> */}
          <div className="flex items-center">
            <button
              type="button"
              className="text-lg text-gray-900 font-semibold"
            >
              <i className="ri-menu-line" />
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 h-10 relative">
                <img
                  className="w-8 h-8 rounded-full border"
                  src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                  alt="User"
                />
                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
              </div>

              <div className="ml-2 text-left">
                <h2 className="text-sm font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-[#ffffff] border border-gray-100 rounded-md shadow-md">
                <li className="py-2 px-4 hover:bg-gray-50 text-gray-700 cursor-pointer">
                  Profile
                </li>
                <li className="py-2 px-4 hover:bg-gray-50 text-gray-700 cursor-pointer">
                  Settings
                </li>

                <li
                  className="py-2 px-4 hover:bg-gray-50 text-gray-700 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </nav>
        {/* content */}
        <div>{activeItem === "Home" && <AdminHomePage />}</div>
        <div>{activeItem === "Profile" && <AdminProfile />}</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
