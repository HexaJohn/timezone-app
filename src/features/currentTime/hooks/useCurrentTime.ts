// src/features/currentTime/hooks/useCurrentTime.ts

import { useState, useEffect } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { CurrentTimeHook } from "../types";

/**
 * Custom hook to manage the current time and timezone.
 * This hook interfaces with the global app context to keep track of time.
 *
 * @returns {CurrentTimeHook} An object containing the current time, timezone, and a function to set the timezone.
 */
export const useCurrentTime = (): CurrentTimeHook => {
  // Access the global app state and dispatch function
  const { state, dispatch } = useAppContext();

  // Local state to manage the current timezone
  // Initialize with the user's local timezone
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // Effect to update the current time every second
  useEffect(() => {
    // Set up an interval to update the time every 1000ms (1 second)
    const timer = setInterval(() => {
      const now = new Date();
      // Dispatch an action to update the current time in the global state
      dispatch({ type: "SET_CURRENT_TIME", payload: now });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [dispatch]); // Only re-run the effect if dispatch changes

  // Effect to update the base timezone in the global state when the local timezone changes
  useEffect(() => {
    dispatch({ type: "SET_BASE_TIMEZONE", payload: timezone });
  }, [timezone, dispatch]); // Re-run the effect if timezone or dispatch changes

  // Return the current time from the global state, and the local timezone state and setter
  return {
    currentTime: state.currentTime,
    timezone,
    setTimezone,
  };
};
