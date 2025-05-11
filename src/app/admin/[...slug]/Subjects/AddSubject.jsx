"use client"
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
const AddSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectSession, setsubjectSession] = useState(0);
  const router = useRouter();
  const user = useSelector((state) => state.user.userDetails);
  const pathname = usePathname();
  const parts = pathname.split('/');
  const classId = parts[parts.length - 1];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!subjectName || !subjectCode || !subjectSession) {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/addSubject`,
        {
          subjectName,
          subjectCode,
          subjectSession: subjectSession,
          subjectClass: classId, 
          instituteName: user?.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Subject added successfully");
      } 
      router.push("/admin/Subjects");
    } catch (error) {
      toast.error("Failed to add subject");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-2xl font-bold text-center mb-6">Add Subject</h2>

        <div className="px-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <input
                type="text"
                id="subjectName"
                name="subjectName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter subject name"
                required
                onChange={(e) => setSubjectName(e.target.value)}
                value={subjectName}
              />
            </div>

            <div className="space-y-2">
              <input
                type="text"
                id="subjectCode"
                name="subjectCode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter subject code"
                required
                onChange={(e) => setSubjectCode(e.target.value)}
                value={subjectCode}
              />
            </div>

            <div className="space-y-2">
              <input
                type="number"
                id="sessionCount"
                name="sessionCount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter number of sessions"
                required
                onChange={(e) => setsubjectSession(Number(e.target.value))}

                value={subjectSession}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Add Subject
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <Link href="/admin/Subjects">Cancel</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddSubject;
