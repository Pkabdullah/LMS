import { SiGoogleclassroom } from "react-icons/si";
import { GrNotes } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { LuMessageSquareWarning } from "react-icons/lu";
import { PiSealWarningFill } from "react-icons/pi";
import { IoMdLogOut } from "react-icons/io";
import { FaUser, FaHome } from "react-icons/fa";

const sideBarContent = [
  { icon: FaHome, label: "Home", link:"/admin/Home"},
  { icon: SiGoogleclassroom, label: "Classes",link:"/admin/Classes" },
  { icon: GrNotes, label: "Subjects",link:"/admin/Subjects" },
  { icon: GiTeacher, label: "Teachers",link:"/admin/Teachers" },
  { icon: PiStudentFill, label: "Students",link:"/admin/Students" },
  { icon: LuMessageSquareWarning, label: "Notices",link:"/admin/Notices" },
  { icon: PiSealWarningFill, label: "Complains",link:"/admin/Students/SeeComplains" },
  { icon: FaUser, label: "Profile",link:"/admin/Profile" },
  { icon: IoMdLogOut, label: "Logout",link:"/" },
];
export default sideBarContent;
