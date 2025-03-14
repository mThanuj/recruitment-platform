"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Page = () => {
  const { session } = useSelector((state: RootState) => state.session);

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default Page;
