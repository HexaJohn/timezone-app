// src/features/currentTime/hooks/useCurrentTime.ts

import { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { CurrentTimeHook } from "../types";
import {
  getCitiesAndTimezones,
  getTimezoneOffset,
} from "../../../shared/utils/timezones";

/**
 * Custom hook to manage the current time, adjusted time, and timezone.
 * This hook interfaces with the global app context to keep track of time and time offset.
 *
 * @returns {CurrentTimeHook} An object containing the current time, adjusted time, timezone, and functions to manage them.
 */
export const useCurrentTime = (): CurrentTimeHook => {
  const { state, dispatch } = useAppContext();
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // Get the list of supported timezones
  const supportedTimezones = useMemo(() => getCitiesAndTimezones(), []);

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
    const adjustedDate = new Date(
      state.currentTime.getTime() + state.timeOffset * 60000
    );
    return adjustedDate;
  }, [state.currentTime, state.timeOffset]);

  /**
   * Get the current offset for the selected timezone.
   */
  const currentOffset = useMemo(() => getTimezoneOffset(timezone), [timezone]);

  /**
   * Set a new timezone and update the global state.
   *
   * @param {string} newTimezone - The new timezone to set
   */
  const setNewTimezone = (newTimezone: string) => {
    setTimezone(newTimezone);
    const newOffset = getTimezoneOffset(newTimezone);
    dispatch({ type: "SET_TIME_OFFSET", payload: newOffset });
  };

  return {
    currentTime: state.currentTime,
    adjustedTime,
    timezone,
    setTimezone: setNewTimezone,
    supportedTimezones,
    currentOffset,
  };
};
