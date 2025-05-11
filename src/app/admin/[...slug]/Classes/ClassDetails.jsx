"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
const ClassDetails = () => {
    const classDetails = useSelector((state) => state.user.stdClass);
    const pathname = usePathname();
    const parts = pathname.split('/');
    const classId = parts[parts.length - 1];

    console.log("Class ID:", classId);
    console.log("classDetails", classDetails)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {classDetails
                .filter((item) => item._id === classId)
                .map((item) => (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden" key={item._id}>
                        <div className="p-6">
                            <div className="border-b pb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Class Details</h2>
                                <p className="mt-2 text-gray-600">Comprehensive information about the class</p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">General Information</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Class Name</label>
                                            <p className="mt-1 text-lg text-gray-900">{item.className}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Section</label>
                                            <p className="mt-1 text-lg text-gray-900">-</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Academic Year</label>
                                            <p className="mt-1 text-lg text-gray-900">2023-2024</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-sm text-gray-600">Total Students</p>
                                            <p className="text-2xl font-bold text-green-600">45</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-sm text-gray-600">Total Subjects</p>
                                            <p className="text-2xl font-bold text-blue-600">6</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-sm text-gray-600">Teachers</p>
                                            <p className="text-2xl font-bold text-purple-600">8</p>
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

                                    <button className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Attendance
                                    </button>
                                    <button className="flex items-center justify-center px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Generate Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>))}
        </div>
    )
}

export default ClassDetails;
