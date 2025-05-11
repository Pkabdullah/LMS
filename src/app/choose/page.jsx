"use client";
import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

const Choose = () => {
  const router = useRouter();
  const handleRedirect = (role) => {
    router.push(`/Login?role=${role}`);
  };
  return (
    <div className="h-screen w-screen bg-[#4169E1] flex flex-col md:flex-row justify-evenly items-center px-2 md:px-0 py-8 md:py-0 space-y-4 md:space-y-0">
      <div
        className="border-2 border-transparent w-full md:w-[25%] h-[28%] mt-4 md:mt-10 bg-white hover:text-white hover:text-white hover:bg-[#1E3A8A]   transition-all duration-300 hover:scale-105 cursor-grab"
        onClick={() => handleRedirect("admin")}
      >
        <div className="flex justify-center mt-2 ">
          <Image
            src="/adminicon.png"
            alt="admin"
            width={50}
            height={10}
            className=""
          />
        </div>
        <h4 className="text-center mt-2 font-semibold text-xl md:text-2xl">Admin</h4>
        <p className="text-center text-sm md:text-base px-2">
          Login as an administrator to access the dashboard to manage app data.
        </p>
      </div>

      <div
        className="border-2 border-transparent w-full md:w-[25%] h-[28%] mt-4 md:mt-10 bg-white hover:text-white hover:bg-[#2563EB] transition-all duration-300 hover:scale-105 cursor-grab"
        onClick={() => handleRedirect("teacher")}
      >
        <div className="flex justify-center mt-2 ">
          <Image src="/teachicon.png" alt="admin" width={50} height={30} />
        </div>
        <h4 className="text-center mt-2 font-semibold text-xl md:text-2xl">Teacher</h4>
        <p className="text-center text-sm md:text-base px-2">
          Login as a teacher to create courses, assignments, and track student
          progress.
        </p>
      </div>
      <div
        className="border-2 border-transparent w-full md:w-[25%] h-[28%] mt-4 md:mt-10 bg-white hover:text-white hover:bg-[#38BDF8] transition-all duration-300 hover:scale-105 cursor-grab"
        onClick={() => handleRedirect("student")}
      >
        <div className="flex justify-center mt-2">
          <Image src="/stdicon.png" alt="admin" width={50} height={30} />
        </div>
        <h4 className="text-center mt-2 font-semibold text-xl md:text-2xl">Student</h4>
        <p className="text-center text-sm md:text-base px-2">
          Login as a student to explore course materials and assignments.
        </p>
      </div>
    </div>
  );
};

export default Choose;
