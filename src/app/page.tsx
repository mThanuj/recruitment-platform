"use client";

import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "@/redux/slices/sessionSlice";
import { useAuth } from "@clerk/nextjs";
import { fetchUserData } from "@/lib/api/user";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

const LandingPage = () => {
  const session = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const { isLoaded, userId: clerkId, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session.session && isLoaded && isSignedIn && clerkId) {
      const initializeSession = async () => {
        try {
          const userData = await fetchUserData(clerkId);
          dispatch(addSession(userData));
        } catch (error) {
          console.error(error);
        }
      };

      initializeSession();
    }
  }, [isLoaded, isSignedIn, clerkId, dispatch, session.session]);

  if (!isLoaded) {
    return <Loader />;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      className="min-h-screen rounded-md w-full flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white px-6 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-center drop-shadow-lg text-gray-100"
        variants={itemVariants}
      >
        Welcome to Recruitment Platform
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl mb-10 text-center max-w-3xl text-gray-400"
        variants={itemVariants}
      >
        Connecting recruiters and job seekers with a modern, AI-powered
        platform.
      </motion.p>
      <motion.div
        className="flex flex-col md:flex-row gap-16"
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <motion.div
          className="flex flex-col items-center space-y-3 bg-gray-800 p-6 rounded-xl shadow-lg"
          variants={itemVariants}
          whileHover="hover"
        >
          <span className="font-semibold text-lg text-gray-300">
            Recruiter?
          </span>
          <Button
            onClick={() => router.push("/recruiter-dashboard")}
            className="w-64 bg-gray-700 text-white hover:bg-gray-600"
          >
            Go to Recruiter Dashboard
          </Button>
        </motion.div>
        <motion.div
          className="flex flex-col items-center space-y-3 bg-gray-800 p-6 rounded-xl shadow-lg"
          variants={itemVariants}
          whileHover="hover"
        >
          <span className="font-semibold text-lg text-gray-300">
            Candidate?
          </span>
          <Button
            onClick={() => router.push("/candidate-portal")}
            className="w-64 bg-gray-700 text-white hover:bg-gray-600"
          >
            Go to Candidate Portal
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
