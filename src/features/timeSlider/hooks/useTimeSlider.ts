// src/features/timeSlider/hooks/useTimeSlider.ts

import { useCallback } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { TimeSliderHook } from "../types";

/**
 * Custom hook to manage the time offset slider functionality.
 * This hook interfaces with the global app context to manage the time offset.
 *
 * @returns {TimeSliderHook} An object containing the current offset and a function to set the offset.
 */
export const useTimeSlider = (): TimeSliderHook => {
  // Access the global app state and dispatch function
  const { state, dispatch } = useAppContext();

  /**
   * Updates the time offset in the global state.
   * This function is memoized to prevent unnecessary re-renders.
   *
   * @param {number} offset - The new time offset in minutes.
   */
  const setOffset = useCallback(
    (offset: number) => {
      dispatch({ type: "SET_TIME_OFFSET", payload: offset });
    },
    [dispatch]
  );

  return {
    currentOffset: state.timeOffset,
    setOffset,
  };
};
