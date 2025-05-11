"use client"
import { setTeachers } from "@/app/RTK/userslice";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const subjectClsWise = useSelector((state) => state.user.subjectClassWise);

  const pathname = usePathname();
  const parts = pathname.split('/');
  const subjectId = parts[parts.length - 1];

  const dispatch = useDispatch();

  const subject = subjectClsWise.find((subject) => subject._id === subjectId);
  const classDetails = useSelector((state) => state.user.stdClass);
  const classOfSubject = classDetails.find((item) => item._id === subject.subjectClass);
  const user = useSelector((state) => state.user.userDetails);


  const attendance = [
    {
      "date": "2024-04-25",
      "presentCount": "20",
      "absentCount": "5"
    }
  ]
  const handleTeacherRegister = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !teacherCode || !password) {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/teacherRegister/${subjectId}`, { name, email, teacherCode, password, instituteName: user.userId, teacherClass: classOfSubject._id, teachsubject: subjectId, attendance, role: "teacher" });
      console.log("response", response.data.teacher);

      if (response.status === 200 || response.status === 201) {
        toast.success("Teacher registered successfully");
        router.push("/admin/Teachers");
        dispatch(setTeachers(response.data.teacher));
        setName("");
        setEmail("");
        setTeacherCode("");
        setPassword("");
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleSendTeacherEmail = async (e) => {
    e.preventDefault();
    try {
      
      const emailResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/send-email`, {
        to: email, subject: "Welcome to LMS – Your Teaching Account Has Been Successfully Created", html: ` 
       <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background-color: #f5f7fb;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background: #2b4dff;
      color: white;
      padding: 40px 30px;
      text-align: center;
    }

    .header h2 {
      margin: 0;
      font-weight: 600;
      font-size: 28px;
    }

    .header h2:first-child {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .content {
      padding: 40px 30px;
      color: #444;
    }

    .content p {
      margin: 20px 0;
    }

    .credentials {
      background: #f8f9ff;
      border-left: 4px solid #2b4dff;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }

    .credentials li {
      margin: 10px 0;
      list-style: none;
      position: relative;
      padding-left: 25px;
    }

    .credentials li:before {
      content: "•";
      color: #2b4dff;
      position: absolute;
      left: 0;
      font-size: 20px;
      line-height: 1;
    }

    .footer {
      background: #f8f9ff;
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
      border-top: 1px solid #eaeef7;
    }

    .welcome-text {
      color: #2b4dff;
      font-size: 20px;
      font-weight: 500;
      margin: 20px 0;
    }

    .button {
      display: inline-block;
      background: #2b4dff;
      color: white !important;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .container {
        margin: 10px;
      }
      .header {
        padding: 30px 15px;
      }
      .content {
        padding: 30px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to LMS Platform</h2>
      <h2>Admin: ${user.name}</h2>
    </div>
    
    <div class="content">
      <p>Asalam O Alaikum <strong style="color: #2b4dff;">${name}</strong>,</p>

      <p class="welcome-text">
        🎉 We're thrilled to welcome you as a new instructor on our institute ${user.instituteName}!
      </p>

      <p>Your account has been successfully created. Here are your login credentials:</p>

      <div class="credentials">
        <ul>
          <li><strong>(ID):</strong> ${teacherCode}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
      </div>

      <p>To get started, please visit our portal:</p>
      <a href="#" class="button">Access LMS Portal</a>

      <p>We recommend changing your password after initial login. If you need any assistance setting up your courses or understanding the platform features, our support team is always ready to help.</p>

      <p>Welcome aboard, and happy teaching! 🚀</p>

      <p>Best regards,<br>
      <strong>LMS Team</strong></p>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} Learning Management System. All rights reserved.<br>
      <div style="margin-top: 10px; color: #888;">
        Need help? Contact us at <a href="mailto:support@lms.com" style="color: #2b4dff; text-decoration: none;">support@lms.com</a>
      </div>
    </div>
  </div>
</body>
</html>` })

      console.log("emailResponse", emailResponse.data.sendMail);
      if (emailResponse.status === 200 || emailResponse.status === 201) {
        toast.success(`Email sent to ${name} successfully`);

      }
    } catch (error) {
      toast.error(`Failed to send email. Please try again later.`);
      console.error("Email send error:", error);
      
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Add Teacher</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <div className="p-2 bg-gray-100 rounded-md text-sm">{subject.subjectName}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <div className="p-2 bg-gray-100 rounded-md text-sm">{classOfSubject.className}</div>
          </div>
        </div>

        <form className="space-y-3" onSubmit={(e) => {
          handleTeacherRegister(e);
          handleSendTeacherEmail(e);
        }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full p-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter teacher's name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter teacher's email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Code</label>
            <input
              type="text"
              className="w-full p-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter teacher's code"
              onChange={(e) => setTeacherCode(e.target.value)}
              value={teacherCode}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 px-3 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTeacher;


