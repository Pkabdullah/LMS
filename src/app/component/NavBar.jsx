"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../RTK/userslice";
import { useRouter } from "next/navigation";
import { persistor } from "../RTK/store";

const Navbar = ({ isSidebarExpanded }) => {
  const user = useSelector((state) => state.user.userDetails);
  console.log("Image path hereee", user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
  return (
    <header
      className={`bg-[#f0f7ff] p-4 flex justify-between items-center transition-all duration-200 ${
        isSidebarExpanded ? "ml-64" : "ml-0"
      }`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={`/${user.instituteLogo}`}
          alt="School Logo"
          width={70}
          height={40}
          className="object-contain"
        />
        <h2 className="text-xl font-bold text-gray-800">
          {/* {user.instituteName} */}
        </h2>
      </div>
      <section className="flex items-center gap-4 relative ml-auto">
        <div className="relative">
          <FiBell className="text-2xl text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        <button
          type="button"
          className="flex items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-10 h-10 relative top-1">
            <img
              className="w-8 h-8 rounded-full border"
              src={`/${user.adminProfile}`}
              alt="User"
            />
            <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
            <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
          </div>
        </button>

        {isDropdownOpen && (
          <ul className="absolute right-0 top-14 w-40 bg-white border border-gray-100 rounded-md shadow-md z-50">
            <Link href="/admin/Profile">
              <li
                className="py-2 px-4 hover:bg-gray-50 text-gray-700 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </li>
            </Link>
            <li className="py-2 px-4 hover:bg-gray-50 text-gray-700 cursor-pointer">
              Settings
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-50 text-gray-700 cursor-pointer"
              onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}
            >
              Logout
            </li>
          </ul>
        )}
      </section>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
