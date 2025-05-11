"use client"
import React from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode";
import Button1 from "@/components/ui/button1";
import Link from "next/link";
import { motion } from "framer-motion";

const Main = () => {


  return (
    <div> 
      <div className="absolute top-0  left-0 ">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1365"
      height="310"
      viewBox="0 0 1440 320"
    >
          <path fill="#0099ff" fill-opacity="1" d="M0,96L48,106.7C96,117,192,139,288,133.3C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
      
    </div>
      <div className="absolute right-0 top-5">
        <Image
          src="/Illustrations-Education.png"
          alt="Banner"
          width={900}
          height={0}
          className=""
        />{" "}

      </div>




      <div className="absolute left-0 pl-32 pt-24 ">
        <h1 id="main-text" className="text-[80px] text-[#3E3E3E] font-bold ">Education &<br />  E-learning</h1>

      </div>

      <div className="absolute left-75 top-120  ">
        <Link href={"/choose"}> <Button1 /></Link>

      </div>
      <div className="absolute left-60 top-140 ">
        <h3>
          Don't have an account?{" "}
          <Link href={""} className="text-indigo-500">
            Sign up{" "}
          </Link>
        </h3>
      </div>


    </div>



  );
};

export default Main;
