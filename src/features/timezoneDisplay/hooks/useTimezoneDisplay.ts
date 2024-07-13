// src/features/timezoneDisplay/hooks/useTimezoneDisplay.ts

import { useMemo, useCallback } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { TimezoneDisplayHook } from "../types";
import { getTimezoneOffset } from "../../../shared/utils/timezones";

/**
 * Custom hook to manage the display of selected timezones.
 * This hook interfaces with the global app context to manage the list of selected timezones.
 *
 * @returns {TimezoneDisplayHook} An object containing the list of selected timezones and functions to manage them.
 */
export const useTimezoneDisplay = (): TimezoneDisplayHook => {
  const { state, dispatch } = useAppContext();

  /**
   * Memoized list of selected timezones with their current offsets.
   * This ensures that the offsets are always up-to-date, even if they change due to daylight saving time.
   */
  const timezones = useMemo(() => {
    return state.selectedTimezones.map((tz) => ({
      ...tz,
      offset: getTimezoneOffset(tz.name),
    }));
  }, [state.selectedTimezones, state.currentTime]); // Re-calculate when selectedTimezones or currentTime changes

  /**
   * Removes a timezone from the list of selected timezones.
   *
   * @param {string} timezoneName - The name of the timezone to remove
   */
  const removeTimezone = useCallback(
    (timezoneName: string) => {
      dispatch({ type: "REMOVE_TIMEZONE", payload: timezoneName });
    },
    [dispatch]
  );

  /**
   * Calculates the time for a given timezone based on the current time and time offset.
   *
   * @param {string} timezone - The timezone to calculate the time for
   * @returns {Date} The calculated time for the given timezone
   */
  const getTimezoneTime = useCallback(
    (timezone: string) => {
      const date = new Date(
        state.currentTime.getTime() + state.timeOffset * 60000
      );
      return new Date(date.toLocaleString("en-US", { timeZone: timezone }));
    },
    [state.currentTime, state.timeOffset]
  );

  return {
    timezones,
    removeTimezone,
    getTimezoneTime,
  };
};
