// src/shared/types/appState.ts

import { CityTimezone } from "../../features/timezoneSearch/types";

export interface AppState {
  currentTime: Date;
  baseTimezone: string;
  selectedTimezones: CityTimezone[];
  timeOffset: number;
}

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export type AppAction =
  | { type: "SET_CURRENT_TIME"; payload: Date }
  | { type: "SET_BASE_TIMEZONE"; payload: string }
  | { type: "ADD_TIMEZONE"; payload: CityTimezone }
  | { type: "REMOVE_TIMEZONE"; payload: CityTimezone }
  | { type: "SET_TIME_OFFSET"; payload: number };
