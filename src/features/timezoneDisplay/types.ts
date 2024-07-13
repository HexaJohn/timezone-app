// src/features/timezoneDisplay/types.ts

import { Timezone } from "../timezoneSearch/types";

export interface TimezoneCardProps {
  timezone: Timezone;
  currentTime: Date;
  onRemove: (timezone: Timezone) => void;
}

export interface TimezoneDisplayProps {
  timezones: Timezone[];
  currentTime: Date;
  onRemoveTimezone: (timezone: Timezone) => void;
}

export interface TimezoneDisplayHook {
  timezones: Timezone[];
  addTimezone: (timezone: Timezone) => void;
  removeTimezone: (timezone: Timezone) => void;
}
