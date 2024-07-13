// src/shared/types/appState.ts

import { Timezone } from "../../features/timezoneSearch/types";

export interface AppState {
  currentTime: Date;
  baseTimezone: string;
  selectedTimezones: Timezone[];
  timeOffset: number;
}

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export type AppAction =
  | { type: "SET_CURRENT_TIME"; payload: Date }
  | { type: "SET_BASE_TIMEZONE"; payload: string }
  | { type: "ADD_TIMEZONE"; payload: Timezone }
  | { type: "REMOVE_TIMEZONE"; payload: Timezone }
  | { type: "SET_TIME_OFFSET"; payload: number };
