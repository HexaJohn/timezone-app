// src/features/timezoneSearch/types.ts

export interface Timezone {
  name: string;
  offset: number;
}

export interface TimezoneSearchProps {
  onTimezoneSelect: (timezone: Timezone) => void;
}

export interface TimezoneSearchHook {
  searchTerm: string;
  searchResults: Timezone[];
  setSearchTerm: (term: string) => void;
  selectTimezone: (timezone: Timezone) => void;
}
