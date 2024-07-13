// src/features/timezoneSearch/types.ts

/**
 * Represents a timezone with its name and offset.
 */
export interface Timezone {
  /** The name of the timezone */
  name: string;
  /** The offset from UTC in minutes */
  offset: number;
}

/**
 * Props for the TimezoneSearch component.
 * Currently empty as the component doesn't accept any props.
 */
export interface TimezoneSearchProps {}

/**
 * Interface for the useTimezoneSearch hook return value.
 */
export interface TimezoneSearchHook {
  /** The current search term */
  searchTerm: string;
  /** Function to update the search term */
  setSearchTerm: (term: string) => void;
  /** The list of timezones matching the current search term */
  searchResults: Timezone[];
  /** Function to select a timezone and add it to the global state */
  selectTimezone: (timezone: Timezone) => void;
}
