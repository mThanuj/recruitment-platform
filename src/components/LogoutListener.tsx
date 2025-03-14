"use client";

import { useOnLogout } from "@/hooks/useOnLogout";
import { clearSession } from "@/redux/slices/sessionSlice";
import { persistor } from "@/redux/store";
import { useDispatch } from "react-redux";

const LogoutListener = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearSession());
    persistor.purge();
  };

  useOnLogout(handleLogout);

  return null;
};

export default LogoutListener;
