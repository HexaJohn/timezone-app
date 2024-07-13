// src/features/timezoneDisplay/hooks/useTimezoneDisplay.ts

import { useMemo, useCallback } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { TimezoneDisplayHook } from "../types";
import { getTimezoneOffset } from "../../../shared/utils/timezones";
import { CityTimezone } from "../../timezoneSearch/types";

export const useTimezoneDisplay = (): TimezoneDisplayHook => {
  const { state, dispatch } = useAppContext();

  const timezones = useMemo(() => {
    return state.selectedTimezones.map((tz) => ({
      ...tz,
      offset: getTimezoneOffset(tz.timezone),
    }));
  }, [state.selectedTimezones, state.currentTime]);

  const removeTimezone = useCallback(
    (cityId: number) => {
      dispatch({ type: "REMOVE_TIMEZONE", payload: cityId });
    },
    [dispatch]
  );

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
