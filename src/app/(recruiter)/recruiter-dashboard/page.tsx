"use client";

import Loader from "@/components/Loader";
import NewRecruiter from "../components/NewRecruiter";
import { fetchUserData } from "@/lib/api";
import { addSession } from "@/redux/slices/sessionSlice";
import { RootState } from "@/redux/store";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { session } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const { isLoaded, userId: clerkId, isSignedIn } = useAuth();

  useEffect(() => {
    if (!session && isLoaded && isSignedIn && clerkId) {
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
  }, [isLoaded, isSignedIn, clerkId, dispatch, session]);

  if (!isLoaded || !session) {
    return <Loader />;
  }

  if (session.role === "candidate") {
    return <NewRecruiter />;
  }

  return (
    <div>
      <ul>
        <li>Option to create a job posting</li>
        <li>Candidate Application Track</li>
        <li>Analytics for each job posting by me</li>
      </ul>
    </div>
  );
};

export default Page;
