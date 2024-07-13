// src/features/timezoneSearch/types.ts

import { CityInfo } from "../../shared/utils/timezones";

export interface CityTimezone extends CityInfo {
  offset: number;
}

export interface TimezoneSearchProps {}

export interface TimezoneSearchHook {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Set<CityInfo>;
  selectTimezone: (cityInfo: CityInfo) => void;
}
