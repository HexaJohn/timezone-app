// src/features/timezoneSearch/hooks/useTimezoneSearch.ts

import { useState, useCallback, useMemo } from "react";
import { useAppContext } from "../../../shared/context/AppContext";
import { TimezoneSearchHook, CityTimezone } from "../types";
import {
  getCitiesAndTimezones,
  getTimezoneOffset,
  CityInfo,
} from "../../../shared/utils/timezones";

export const useTimezoneSearch = (): TimezoneSearchHook => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch, state } = useAppContext();

  const citiesAndTimezones = useMemo(() => {
    const cities = getCitiesAndTimezones();
    return new Set(cities);
  }, []);

  const searchResults = useMemo(() => {
    if (citiesAndTimezones.size === 0) return new Set<CityInfo>();
    if (!searchTerm.trim()) return citiesAndTimezones;
    const lowercasedTerm = searchTerm.toLowerCase();
    return new Set(
      Array.from(citiesAndTimezones).filter(
        (ct) =>
          ct.city?.toLowerCase().includes(lowercasedTerm) ||
          ct.country?.toLowerCase().includes(lowercasedTerm) ||
          ct.timezone?.toLowerCase().includes(lowercasedTerm)
      )
    );
  }, [citiesAndTimezones, searchTerm]);

  const selectTimezone = useCallback(
    (cityInfo: CityInfo) => {
      const cityTimezone: CityTimezone = {
        ...cityInfo,
        offset: getTimezoneOffset(cityInfo.timezone),
      };
      if (!state.selectedTimezones.some((tz) => tz.id === cityTimezone.id)) {
        dispatch({ type: "ADD_TIMEZONE", payload: cityTimezone });
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
