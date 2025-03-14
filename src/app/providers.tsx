"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { motion } from "framer-motion";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClerkProvider>
          <QueryClientProvider client={queryClient}>
            <AnimatePresence mode="wait">
              <motion.div>{children}</motion.div>
            </AnimatePresence>
          </QueryClientProvider>
        </ClerkProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
