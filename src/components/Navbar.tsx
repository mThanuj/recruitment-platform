"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="bg-gray-900 text-white shadow-md p-4 z-50 flex justify-between items-center fixed top-0 left-0 right-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="text-2xl font-extrabold tracking-wide text-gray-100"
        whileHover={{ scale: 1.05 }}
      >
        <Link href="/">Recruitment Platform</Link>
      </motion.div>
      <div className="space-x-6 flex items-center">
        <MotionLink href="/recruiter-dashboard">Recruiter Dashboard</MotionLink>
        <MotionLink href="/candidate-portal">Candidate Portal</MotionLink>
        <motion.div whileHover={{ scale: 1.1 }}>
          <UserButton />
        </motion.div>
      </div>
    </motion.nav>
  );
}

const MotionLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </motion.div>
  );
};
