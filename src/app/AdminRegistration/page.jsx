"use client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

import Link from "next/link";
import Image from "next/image";

const AdminRegistration = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [instituteName, setinstituteName] = useState("");
  const [password, setpassword] = useState("");
  const [adminProfile, setadminProfile] = useState("")
  const [instituteLogo, setinstituteLogo] = useState("")

  const handleAdminRegistration = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !instituteName || !password) {
        return toast.error("All fields are required!");
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("instituteName", instituteName);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("adminProfile", adminProfile);
      formData.append("instituteLogo", instituteLogo);

      const userresponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/AdminRegisteration`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (userresponse.status === 200 || userresponse.status === 201) {
        toast.success("Admin registered successfully!", {
          position: "top-center",
          style: { backgroundColor: "yellowgreen", color: "#f7fafc" },
        });
        setTimeout(() => {
          router.replace(`/Login?role=${userresponse.data.admin.role}`);
        }, 2000);
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );

      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-center",
          style: { backgroundColor: "#dc2626", color: "#ffffff" },
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="">
      <div className="max-w-md w-4/12 rounded-none p-4 md:p-8 shadow-input bg-[#E0FFFF] dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Admin Registration
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Create your own school by registering as an admin. You will be able to
          add students and faculty and manage the system.
        </p>
        <form className="" onSubmit={handleAdminRegistration}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="text">Enter your name</Label>
            <Input
              onChange={(e) => setname(e.target.value)}
              id="name"
              placeholder="admin"
              type="text"
              name="name"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="text">Create your institute name</Label>
            <Input
              onChange={(e) => setinstituteName(e.target.value)}
              id="instituteName"
              placeholder="abc school"
              type="text"
              name="instituteName"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="adminLMS@pk.com"
              type="email"
              name="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setpassword(e.target.value)}
              id="password"
              placeholder="••••••••"
              type="password"
              name="password"
            />
          </LabelInputContainer>

          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="password">Admin Profile Image</Label>
            <input id="picture" type="file" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" 
           onChange={(e) => setadminProfile(e.target.files[0])}
           />

            <Label htmlFor="password">Institute Logo</Label>
            <input id="picture" type="file" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" 
            onChange={(e) => setinstituteLogo(e.target.files[0])}  />
          </div>
          <button
            className="bg-gradient-to-br  my-4 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Register
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
          <h3 className="text-md">
            Already have an account?{" "}
            <Link href={`/Login?role=${role}`} className="text-indigo-500">
              Sign in{" "}
            </Link>
          </h3>
        </form>
      </div>

      <div className="absolute w-8/12 h-full right-0 top-0 ">
        <Image
          src="/loginbg.jpg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminRegistration;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
