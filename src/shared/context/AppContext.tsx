import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of our application's state
type TimeState = {
    currentTime: Date;  // The current time, which can be offset
    offset: number;     // The time offset in minutes
    timezones: string[];  // List of saved timezones
};

// Define the possible actions that can be dispatched to update the state
type Action =
    | { type: 'SET_BASE_TIMEZONE'; payload: string }
    | { type: 'SET_CURRENT_TIME'; payload: Date }
    | { type: 'SET_OFFSET'; payload: number }
    | { type: 'ADD_TIMEZONE'; payload: string }
    | { type: 'REMOVE_TIMEZONE'; payload: string };

// Set up the initial state
const initialState: TimeState = {
    currentTime: new Date(),
    offset: 0,
    timezones: [],
};

// Reducer function to handle state updates based on dispatched actions
function timeReducer(state: TimeState, action: Action): TimeState {
    switch (action.type) {
        case 'SET_CURRENT_TIME':
            return { ...state, currentTime: action.payload };
        case 'SET_OFFSET':
            return { ...state, offset: action.payload };
        case 'ADD_TIMEZONE':
            return { ...state, timezones: [...state.timezones, action.payload] };
        case 'REMOVE_TIMEZONE':
            return { ...state, timezones: state.timezones.filter(tz => tz !== action.payload) };
        default:
            return state;
    }
}

// Create a context with an undefined default value
const AppContext = createContext<{
    state: TimeState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Provider component that wraps app and makes context available to child components
export function AppProvider({ children }: { children: ReactNode }) {
    // Use useReducer to manage state with our timeReducer and initialState
    const [state, dispatch] = useReducer(timeReducer, initialState);

    // The value prop of the provider will be passed to consuming components
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

// Custom hook to use the AppContext and handle undefined case
export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        // This error will be thrown if useAppContext is used outside of AppProvider
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}