// src/features/timezoneSearch/hooks/useTimezoneSearch.ts

import { useState, useCallback, useMemo } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { TimezoneSearchHook, Timezone } from "../types";
import {
  getSupportedTimezones,
  getTimezoneOffset,
} from "../../../shared/utils/timezones";

/**
 * Custom hook to manage timezone search functionality.
 * This hook provides search capabilities and interfaces with the global app context.
 *
 * @returns {TimezoneSearchHook} An object containing search state and functions.
 */
export const useTimezoneSearch = (): TimezoneSearchHook => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch, state } = useAppContext();

  /**
   * Memoized list of all timezones with their offsets.
   */
  const TIMEZONES: Timezone[] = useMemo(() => {
    return getSupportedTimezones().map((tz) => ({
      name: tz,
      offset: getTimezoneOffset(tz),
    }));
  }, []);

  /**
   * Filters timezones based on the current search term.
   * This calculation is memoized to prevent unnecessary recalculations.
   */
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return TIMEZONES;
    return TIMEZONES.filter((tz) =>
      tz.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [TIMEZONES, searchTerm]);

  /**
   * Handles the selection of a timezone.
   * Dispatches an action to add the selected timezone to the global state.
   */
  const selectTimezone = useCallback(
    (timezone: Timezone) => {
      if (!state.selectedTimezones.some((tz) => tz.name === timezone.name)) {
        dispatch({ type: "ADD_TIMEZONE", payload: timezone });
      }
    },
    [dispatch, state.selectedTimezones]
  );

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    selectTimezone,
  };
};
