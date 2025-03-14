import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useOnLogout(onLogout: () => void) {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      onLogout();
    }
  }, [isLoaded, isSignedIn, onLogout]);
}
