"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { setStudents } from "@/app/RTK/userslice";

const AddStudent = () => {
  const classDetails = useSelector((state) => state.user.stdClass);
  const user = useSelector((state) => state.user.userDetails);
  const subjectDetails = useSelector((state) => state.user.subjects);
  const router = useRouter("")

  const [classId, setClassId] = useState(null);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    const selectedClassObj = classDetails.find(item => item.className === selectedClass);
    const selectedClassId = selectedClassObj?._id;
    setClassId(selectedClassId);

    const filtered = subjectDetails.filter(
      (subj) => subj.subjectClass === selectedClassId
    );
    setFilteredSubjects(filtered);


  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const OnSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register-student`,
        {
          ...formData,
          stdClassName: classId,
          instituteName: user?.userId,
          role: "student",
          examResult,
          attendance
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Student registered successfully:", response.data);
        router.push("/admin/Students");

      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const attendance = filteredSubjects.map(subject => ({
    date: "2025-05-01",
    status: "Present",
    subjectName: subject._id
  }));

  const examResult = filteredSubjects.map(subject => ({
    subName: subject._id,
    marksObtained: 90
  }));


  return (
    <div className="flex justify-center items-center h-[90vh] ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Student</h2>
        <form className="space-y-4 bg-gray-100" onSubmit={handleSubmit(OnSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter student name"
              {...register('name', { required: "Student name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter student email"
              {...register("email", { required: " Student Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              {...register("stdClassName", { required: "Please select a class" })}
              onChange={handleClassChange}
            >
              <option value="">Select Class</option>
              {classDetails.map((item, index) => (
                <option key={item._id} value={item.className}>
                  {item.className}
                </option>
              ))}
            </select>
            {errors.stdClassName && (
              <p className="text-red-500 text-sm">{errors.stdClassName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roll Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter roll number"
              {...register("rollNumber", { required: "Please Enter Student's roll number" })}
            />
            {errors.rollNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.rollNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter password"
              {...register("password", { required: "Please enter Strong Password" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#2269c0] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Student
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;
