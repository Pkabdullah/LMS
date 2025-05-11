"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {setCurrentRole, setUserDetails} from "../RTK/userslice"
const LoginPage = () => {
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [roleName, setRoleName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (role) {
      setRoleName(role.charAt(0).toUpperCase() + role.slice(1));
    }
  }, [role]);
  const handleRedirectRegisterAdmin = (role) => {
    router.push(`/AdminRegistration?role=${role}`);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (userLogin.ok) {
        toast.success("Admin login successfully!");
        router.replace(`/admin/Home`);
      }
      if (!userLogin.ok) {
        toast.error("Incorrect UserName or Passowrd!");
        router.refresh();
      }

      const data = await userLogin.json();
      console.log("userLoginResponse:", data);
      dispatch(setUserDetails(data));
      dispatch (setCurrentRole(data.role))
    } catch (error) {
      console.log(`Error: ${error.message}`);
      toast.error("Login failed!");
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-4/12 p-4 md:p-8 bg-[#E0FFFF] dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          {roleName}'s Login
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Welcome back! Please enter your details
        </p>
        <form className="my-8" onSubmit={handleLogin}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="adminLMS@pk.com.com"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Log in &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div
            onClick={() => handleRedirectRegisterAdmin("admin")}
            className="cursor-pointer"
          >
            <h3>Don't have an account? Sign up </h3>
          </div>
        </form>
      </div>
      <div className="hidden md:block md:w-9/12 relative ">
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

export default LoginPage;

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
