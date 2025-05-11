"use client";
import React from "react";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const user = useSelector((state) => state.user.userDetails);

  console.log("User in Admin Profile page", user);
  return (
    <div>
      <>
        <div className="flex flex-col gap-6 p-8">
          <div className="flex items-center gap-6">
            <img
              src={`/${user.adminProfile}`}
              alt="Admin Profile"
              className="w-24 h-24 rounded-full border-4 border-[#d9b99b]"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">Administrator</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-700">Email:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-700">School:</span>
              <span className="text-gray-600">{user.instituteName}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-700">Role:</span>
              <span className="text-gray-600">School Administrator</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-700">Status:</span>
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

      </>
    </div>
  );
};

export default AdminProfile;
