// src/features/timezoneDisplay/types.ts

import { CityTimezone } from "../timezoneSearch/types";

export interface TimezoneDisplayHook {
  timezones: CityTimezone[];
  removeTimezone: (cityId: number) => void;
  getTimezoneTime: (timezone: string) => Date;
}

export interface TimezoneCardProps {
  cityTimezone: CityTimezone;
  onRemove: (cityId: number) => void;
  getTime: (timezone: string) => Date;
}

export interface TimezoneDisplayProps {}
