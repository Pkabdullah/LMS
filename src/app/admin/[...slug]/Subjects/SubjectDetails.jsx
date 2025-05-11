"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
const ClassDetails = () => {

  const subjectDetails = useSelector((state) => state.user.subjects);
  const classDetails = useSelector((state) => state.user.stdClass);

  const pathname = usePathname();
  const parts = pathname.split('/');
  const subjectId = parts[parts.length - 1];

  console.log("Subject ID:", subjectId);
  console.log("Subjects:", subjectDetails);

  const getClassName = (subjectClassId) => {
    const match = classDetails?.find(cls => cls._id === subjectClassId);
    return match ? match.className : "Unknown Class";
  };
  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {subjectDetails
        .filter((item) => item._id === subjectId)
        .map((item) => (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="border-b pb-6">
                <h2 className="text-3xl font-bold text-gray-900">Subject Details</h2>
                <p className="mt-2 text-gray-600">Comprehensive information about the Subject</p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">General Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Subject Name</label>
                      <p className="mt-1 text-lg text-gray-900">{item.subjectName}</p>
                    </div> <div>
                      <label className="block text-sm font-medium text-gray-600">Class Name</label>
                      <p className="mt-1 text-lg text-gray-900"> {getClassName(item.subjectClass)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Subject Code</label>
                      <p className="mt-1 text-lg text-gray-900">{item.subjectCode}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">No of Sessions</label>
                      <p className="mt-1 text-lg text-gray-900">{item.subjectSession}</p>
                    </div>


                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-green-600">0</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600">Teachers</p>
                      <p className="text-2xl font-bold text-purple-600">2</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600">Average Attendance</p>
                      <p className="text-2xl font-bold text-orange-600">92%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <button className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Student
                  </button>


                  <button className="flex items-center justify-center px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Teacher
                  </button>
                </div>
              </div>
            </div>
          </div>))}

    </div>
  )
}

export default ClassDetails;
