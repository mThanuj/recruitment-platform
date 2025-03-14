"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const Providers = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
