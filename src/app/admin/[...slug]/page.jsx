"use client";
import React from "react";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import sideBarContent from "../../content";
import { FcMenu } from "react-icons/fc";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
// import { resetUser } from "../RTK/userslice";
// import AdminHomePage from "../../"
// import AdminProfile from "../admin/AdminProfile";
import Unauthorized from "@/components/ui/Unauthorized";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

import Loader from "@/app/component/Loader";
import AdminHomee from "./AdminHome";
import AdminProfile from "./AdminProfile";
import ShowClasses from "./Classes/ShowClasses";
import ClassDetails from "./Classes/ClassDetails";
import AddClass from "./Classes/AddClasses";
import AddClasses from "./Classes/AddClasses";
import ShowSubjects from "./Subjects/ShowSubject";
import ViewSubjects from "./Subjects/SubjectDetails";
import AddSubject from "./Subjects/AddSubject";
import ShowTeacher from "./Teachers/ShowTeacher";
import ChooseClass from "./Teachers/ChooseClass";
import ChooseClassInSubject from "./Subjects/ChooseClassInSub";
import AddTeacher from "./Teachers/AddTeachers";

import AddStudent from "./Students/AddStudent";
import ShowStudent from "./Students/ShowStudent";
import ShowNotice from "./Notice/ShowNotice";
import AddNotice from "./Notice/AddNotice";
import SeeComplains from "./Students/SeeComplains";
import Sidebar from "@/app/component/Sidebar";
import { resetUser } from "@/app/RTK/userslice";
import SubjectDetails from "./Subjects/SubjectDetails";
import ChooseSubject from "./Teachers/ChooseSubject";


const Dashboard = (props) => {

  const { slug = [] } = React.use(props.params);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log("active route", activeItem);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.userDetails);

  const router = useRouter();
  const pathName = usePathname();

  console.log("path name from browser", pathName);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const handleLogout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/AdminLogout`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      toast.success("Logged out successfully!");
      router.replace("/");
      router.refresh();
      dispatch(resetUser());
    } else {
      toast.error("Logout failed!");
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${slug}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log("Not authenticated or authorized");
          toast.error("Not authenticated or not authorized");
          setIsAuthenticated(false);
          router.replace("/");
          return;
        }

        const data = await response.json();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication", error);
        toast.error("Error checking authentication");
        setIsAuthenticated(false);
      }
    };

    if (slug) {
      checkAuth();
    }
  }, [slug]);

  if (!isAuthenticated) {
    return <Loader />;
  }

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
  return (
    <div className=" bg-[#f0f7ff]  ">
      <div className="">
        {/* content */}
        {slug[0] === 'Home' && <AdminHomee />}
        {slug[0] === 'Profile' && <AdminProfile />}
        {/* Classes */}
        {slug[0] === 'Classes' && !slug[1] && <ShowClasses />}
        {slug[0] === 'Classes' && slug[1] === 'AddClass' && <AddClasses />}
        {slug[0] === 'Classes' && slug[1] === 'ClassDetails' && slug[2] && <ClassDetails />}

        {/* Subjects */}
        {slug[0] === 'Subjects' && !slug[1] && <ShowSubjects />}
        {slug[0] === 'Subjects' && slug[1] === 'ChooseClass' && <ChooseClassInSubject />}
        {/* //HERE will be id of a class that i selected from the show classes page */}
        {slug[0] === 'Subjects' && slug[1] === 'AddSubject' && slug[2] && <AddSubject />}
        {slug[0] === 'Subjects' && slug[1] === 'SubjectDetails' && slug[2] && <SubjectDetails />}
        {/* Teachers */}

        {slug[0] === 'Teachers' && !slug[1] && <ShowTeacher />}
        {slug[0] === 'Teachers' && slug[1] === 'ChooseClass' && <ChooseClass />}
        {/* here is id of a subject , where we are assignming ot a teacher */}
        {slug[0] === 'Teachers' && slug[1] === 'ChooseSubject' && slug[2] && <ChooseSubject />}
        {slug[0] === 'Teachers' && slug[1] === 'AddTeacher' && slug[2] && <AddTeacher />}

        {/* Students */}
        {slug[0] === 'Students' && !slug[1] && <ShowStudent />}
        {slug[0] === 'Students' && slug[1] === 'AddStudent' && <AddStudent />}
        {slug[0] === 'Students' && slug[1] === 'SeeComplains' && <SeeComplains />}

        {/* Notices */}
        {slug[0] === 'Notices' && !slug[1] && <ShowNotice />}
        {slug[0] === 'Notices' && slug[1] === 'AddNotice' && <AddNotice />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;

