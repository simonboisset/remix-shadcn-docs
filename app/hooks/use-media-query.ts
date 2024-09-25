import { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string) => {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
