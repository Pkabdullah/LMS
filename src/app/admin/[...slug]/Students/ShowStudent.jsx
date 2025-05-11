"use client"
import InnerLoader from "@/app/component/InnerLoader";
import { setStudents } from "@/app/RTK/userslice";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

const ShowStudent = () => {
  const user = useSelector((state) => state.user.userDetails);
  const classDetails = useSelector((state) => state.user.stdClass);

  const [student, setStudent] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const getStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getStudent/${user?.userId}`
      );
      setStudent(response.data.student || []);
      dispatch(setStudents(response.data.student))
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  const getClassName = (ClassId) => {
    const match = classDetails?.find(cls => cls._id === ClassId);
    return match ? match.className : "Unknown Class";
  };
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <InnerLoader />
        </div>
      ) : student.length === 0 ? (
        <div>
          <div className="flex flex-col items-center gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">No Student Added Yet</h2>
            <p className="text-gray-600">Get started by adding your first Student</p>
          </div>
          <Link href="/admin/Students/AddStudent/">
            <button
              class="bg-white text-center w-56 rounded-2xl h-14 relative text-black text-xl font-semibold group"
              type="button"
            >
              <div
                class="bg-[#2269c0] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height="25px"
                  width="25px"
                >
                  <path
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    fill="#000000"
                  ></path>
                  <path
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>
              <p class="translate-x-2">Add Student</p>
            </button>
          </Link>

        </div >

      ) : (
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <Link href="/admin/Students/AddStudent">
              <button className="px-4 py-2 bg-[#2269c0] text-white rounded-md hover:bg-blue-400 transition duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Student
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">All Students</h2>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {student.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i className="ri-book-line text-blue-600 text-xl"></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}  </div>
                            <div className="text-sm text-gray-500">{item._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.rollNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getClassName(item.stdClassName)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/Student/StudentDetails/${item._id}`}>
                          <button className="text-blue-800 hover:text-blue-900 bg-blue-50 p-2 rounded-lg mr-2 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </Link>
                        {/* onClick={() => handleDeleteStudent(item._id)} */}
                        <button className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition duration-200" >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
          <ToastContainer />
        </div>
      )}
    </>
  )
};

export default ShowStudent;
