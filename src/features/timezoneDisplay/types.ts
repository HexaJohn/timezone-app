// src/features/timezoneDisplay/types.ts

import { Timezone } from "../timezoneSearch/types";

export interface TimezoneDisplayHook {
  timezones: Timezone[];
  removeTimezone: (timezoneName: string) => void;
  getTimezoneTime: (timezone: string) => Date;
}

export interface TimezoneCardProps {
  timezone: Timezone;
  onRemove: (timezoneName: string) => void;
  getTime: (timezone: string) => Date;
}

export interface TimezoneDisplayProps {}
