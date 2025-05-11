"use client";
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Link from 'next/link'
import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const AddClasses = () => {
  const [className, setClassName] = useState("");
  
  const router = useRouter();
  
  const user = useSelector((state) => state.user.userDetails);

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      if (!className) {
        return toast.error("Class name is required");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/addStdClass`,
        {
          className,
          instituteName: user?.userId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Class added successfully");
        setClassName("");
        
       
        router.push("/admin/Classes");
      
      }
      
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add class");
      }
    }
  };




  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">
        <div className="mb-6">
          <img
            src="/addclassBanner.jpeg"
            alt="Education Banner"
            className="w-full h-40 object-cover rounded-t-lg"
          />
        </div>

        <div className="px-6">
          {/* <h1 className="text-2xl font-bold text-center mb-6">Add New Class</h1> */}

          <form className="space-y-6" onSubmit={handleAddClass}>
            <div className="space-y-2">
              <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                Class Name
              </label>
              <input
                type="text"
                id="className"
                name="className"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter class name"
                required
                onChange={(e) => setClassName(e.target.value)}
                value={className}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2269c0] text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"

              >
                Create Class
              </button>

              <Link href="/admin/Classes">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Go Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddClasses;
