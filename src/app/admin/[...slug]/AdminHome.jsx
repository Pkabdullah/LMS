import Image from "next/image";
import React, { useEffect } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import BarChart from "@/app/component/BarChart";
import ClassProgress from "@/app/component/ClassProgress";
import axios from "axios";

const AdminHomePage = () => {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userDetails);
  const [classes, setClasses] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState("")


  const StatsCard = ({ title, end }) => (
    <div className="flex gap-2">
      <h3 className="text-2xl text-[#2e9916] font-semibold">{title}</h3>
      <CountUp
        start={0}
        end={end}
        duration={2.5}
        separator=","
        className="text-3xl text-[#2e9916] font-bold"
      >
        $
      </CountUp>
    </div>
  );

  const getAllClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getAllStdClasses/${user.userId}`
      );
      if (response.data.classes) {
        setClasses(response.data.classes);
        console.log("Classes fetched:", response.data.classes);

      } else {
        setClasses([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setClasses([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.userId) {
      getAllClasses();
    }
  }, [user.userId]);

  const getTeaceher = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getTeachers/${user?.userId}`
    );

    setTeacher(response.data.teachers);
    dispatch(setTeachers(response.data.teachers));
    setLoading(false);
  };
  useEffect(() => {
    getTeaceher();
  }, []);

  const getStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getStudent/${user?.userId}`
      );
      setStudent(response.data.student || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);
  return (
    <div className="bg-[#f0f7ff]">
      <div className="p-6 ">
        <div className="relative mb-8 bg-[#0052b4] p-10 rounded-2xl overflow-hidden">
          <div className="z-10 relative">
            <h1 className="text-3xl font-bold text-white">
              Welcome, <span className="">{user.name}</span>! 👋
            </h1>
            <p className="text-gray-300 mt-2">
              We're glad to see you again in your school management dashboard.
            </p>
          </div>

          <div className="absolute right-4 bottom-0 z-0">
            <Image
              src="/class01.png"
              alt="welcome admin"
              width={300}
              height={200}
              className="scale-x-[-1] object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            {
              bg: "bg-[#fef3f2]",
              iconBg: "bg-[#f04438]",
              icon: "/std1.png",
              title: "Total Students",
              count: student?.length || 0,
            },
            {
              bg: "bg-[#f5f3ff]",
              iconBg: "bg-[#7c3aed]",
              icon: "/class.png",
              title: "Total Classes",
              count: classes?.length || 0,
            },
            {
              bg: "bg-[#fff7ed]",
              iconBg: "bg-[#fb923c]",
              icon: "/teacher.png",
              title: "Total Teachers",
              count: teacher?.length || 0,
            },
            {
              bg: "bg-[#ecfdf5]",
              iconBg: "bg-[#10b981]",
              icon: "/hand.png",
              title: "Fee Collection",
              count: <StatsCard title="$" end={50} />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.bg} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center gap-4">
                <div className={`${item.iconBg} p-3 rounded-full`}>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {item.count}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-10">
          <BarChart />
          <ClassProgress/>
          <div className="w-[300px] max-h-[370px] p-4 bg-white rounded-2xl shadow-md">
            <Calendar />{" "}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6 p-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Notices</h2>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {/* Sample notices - replace with actual data */}
            <div className="border-l-4 border-[#2e9916] pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Parent-Teacher Meeting
              </h3>
              <p className="text-gray-600 mt-1">
                Scheduled for next Friday at 3 PM in the school auditorium.
              </p>
              <span className="text-sm text-gray-500">Posted 2 days ago</span>
            </div>

            <div className="border-l-4 border-[#fabe49] pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Annual Sports Day
              </h3>
              <p className="text-gray-600 mt-1">
                Annual sports day will be held on 15th December. All students
                must participate.
              </p>
              <span className="text-sm text-gray-500">Posted 3 days ago</span>
            </div>

            <div className="border-l-4 border-[#6b69e4] pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Holiday Notice
              </h3>
              <p className="text-gray-600 mt-1">
                School will remain closed on Monday due to local elections.
              </p>
              <span className="text-sm text-gray-500">Posted 5 days ago</span>
            </div>
          </div>
        </div>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-[300px] h-[300px]"
      />
    </div>
  );
};

export default AdminHomePage;
