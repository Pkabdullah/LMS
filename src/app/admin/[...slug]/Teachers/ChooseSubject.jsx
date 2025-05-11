"use client";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import InnerLoader from '@/app/component/InnerLoader';
import Link from 'next/link';
import { ToastContainer,toast } from 'react-toastify';
import { setSubjectClassWise } from '@/app/RTK/userslice';
import { useDispatch } from 'react-redux';
const ChooseSubject = () => {
  const [loading, setLoading] = useState(true);
  const [classSubjects, setClassSubjects] = useState([]);
  const pathname = usePathname();
  const parts = pathname.split('/');
  const classId = parts[parts.length - 1];
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  

  const handleShowSubjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getAllSubjectsByClass/${user.userId}/${classId}`
      );
    
      setClassSubjects(response.data.subjectClassWise);
      setLoading(false);
      dispatch(setSubjectClassWise(response.data.subjectClassWise));
    } catch (error) {
      console.log(error);
      toast.error("Error fetching subjects");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId && classId) {
      handleShowSubjects();
    }
  }, [user?.userId, classId]);

  useEffect(() => {
    console.log("Updated classSubjects:", classSubjects);
  }, [classSubjects]);

  return (
    <>
  
     {loading ? (
      <div className="flex items-center justify-center h-[70vh]">
        <InnerLoader />
      </div>
    ) : classSubjects.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <div className="text-gray-400 text-6xl mb-4">
          <i className="ri-inbox-line"></i>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">No Subject Added Yet</h2>
        <p className="text-gray-600">Get started by adding your first subject</p>
      
      <Link href="/admin/Subjects/ChooseClass">
        <button
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group hover:bg-gray-100 transition-colors duration-300"
          type="button"
        >
          <div
            className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
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
          <p className="translate-x-2">Add Subject</p>
        </button>
      </Link></div>
    
    ):(
    <div className="p-4">
      <div className="flex justify-end mb-4">
        {/* <Link href="/admin/Subjects/ChooseClass">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Subject
          </button>
        </Link> */}
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">All Subjects</h2>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
               
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classSubjects.map((subject) => (
                <tr key={subject._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-book-line text-blue-600 text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{subject.subjectName}</div>
                        <div className="text-sm text-gray-500">{subject.subjectCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {subject.subjectSession}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getClassName(subject.subjectClass)}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/Teachers/AddTeacher/${subject._id}`}>
                        <button className="text-green-800 hover:text-green-900 bg-green-50 p-2 rounded-lg transition duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </Link>
                   
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
  
  );
};

export default ChooseSubject;
