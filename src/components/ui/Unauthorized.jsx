"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Unauthorized = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
    }, 3000);
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <motion.div
        animate={{ x: [-10, 10, -10, 10, 0] }} 
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="p-6 bg-red-500 text-white rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold">🚫 Unauthorized Access</h1>
        <p className="mt-2">You do not have permission to view this page.</p>
      </motion.div>
    </motion.div>
  );
};

export default Unauthorized;
