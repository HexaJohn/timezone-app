// src/shared/context/AppContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Timezone } from '../../features/timezoneSearch/types';

type TimeState = {
    currentTime: Date;
    baseTimezone: string;
    timeOffset: number;
    selectedTimezones: Timezone[];
};

type Action =
    | { type: 'SET_CURRENT_TIME'; payload: Date }
    | { type: 'SET_BASE_TIMEZONE'; payload: string }
    | { type: 'SET_TIME_OFFSET'; payload: number }
    | { type: 'ADD_TIMEZONE'; payload: Timezone }
    | { type: 'REMOVE_TIMEZONE'; payload: string };

const initialState: TimeState = {
    currentTime: new Date(),
    baseTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeOffset: 0,
    selectedTimezones: [],
};

function timeReducer(state: TimeState, action: Action): TimeState {
    switch (action.type) {
        case 'SET_CURRENT_TIME':
            return { ...state, currentTime: action.payload };
        case 'SET_BASE_TIMEZONE':
            return { ...state, baseTimezone: action.payload };
        case 'SET_TIME_OFFSET':
            return { ...state, timeOffset: action.payload };
        case 'ADD_TIMEZONE':
            return { ...state, selectedTimezones: [...state.selectedTimezones, action.payload] };
        case 'REMOVE_TIMEZONE':
            return { ...state, selectedTimezones: state.selectedTimezones.filter(tz => tz.name !== action.payload) };
        default:
            return state;
    }
}

const AppContext = createContext<{
    state: TimeState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(timeReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}