// src/features/currentTime/hooks/useCurrentTime.ts

import { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { CurrentTimeHook } from "../types";

/**
 * Custom hook to manage the current time, adjusted time, and timezone.
 * This hook interfaces with the global app context to keep track of time and time offset.
 *
 * @returns {CurrentTimeHook} An object containing the current time, adjusted time, timezone, and a function to set the timezone.
 */
export const useCurrentTime = (): CurrentTimeHook => {
  const { state, dispatch } = useAppContext();
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      dispatch({ type: "SET_CURRENT_TIME", payload: now });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_BASE_TIMEZONE", payload: timezone });
  }, [timezone, dispatch]);

  /**
   * Calculate the adjusted time based on the current time and time offset.
   * This calculation is memoized to prevent unnecessary recalculations.
   */
  const adjustedTime = useMemo(() => {
    const adjustedDate = new Date(state.currentTime);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + state.timeOffset);
    return adjustedDate;
  }, [state.currentTime, state.timeOffset]);

  return {
    currentTime: state.currentTime,
    adjustedTime,
    timezone,
    setTimezone,
  };
};
