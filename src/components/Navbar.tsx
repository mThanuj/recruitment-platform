import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center absolute top-0 left-0 right-0">
      <div className="text-xl font-bold">
        <Link href="/">Recruitment Platform</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link href="/recruiter-dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/candidate-portal" className="hover:text-blue-600">
          Portal
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}
