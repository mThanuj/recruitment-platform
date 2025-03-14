"use client";

import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "@/redux/slices/sessionSlice";
import { useAuth } from "@clerk/nextjs";
import { fetchUserData } from "@/lib/api";

const Page = () => {
  const session = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const { isLoaded, userId: clerkId, isSignedIn } = useAuth();

  useEffect(() => {
    if (!session.session) {
      console.log("No session found");
    }

    const initializeSession = async () => {
      try {
        const userData = await fetchUserData(clerkId!);
        dispatch(addSession(userData));
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoaded && isSignedIn && clerkId) {
      initializeSession();
    }
  }, [isLoaded]);

  return <div>page</div>;
};

export default Page;
