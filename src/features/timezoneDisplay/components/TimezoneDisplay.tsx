// src/features/timezoneDisplay/components/TimezoneDisplay.tsx

import React from 'react';
import { useTimezoneDisplay } from '../hooks/useTimezoneDisplay';
import { TimezoneDisplayProps, TimezoneCardProps } from '../types';

const TimezoneCard: React.FC<TimezoneCardProps> = ({ cityTimezone, onRemove, getTime }) => {
    const time = getTime(cityTimezone.timezone);

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{cityTimezone.city}, {cityTimezone.country}</h3>
            <p className="text-sm text-gray-500">{cityTimezone.timezone}</p>
            <p className="text-2xl font-bold">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm text-gray-500">
                {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-gray-500">
                UTC {cityTimezone.offset >= 0 ? '+' : ''}{cityTimezone.offset / 60}
            </p>
            <button
                onClick={() => onRemove(cityTimezone.id)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export const TimezoneDisplay: React.FC<TimezoneDisplayProps> = () => {
    const { timezones, removeTimezone, getTimezoneTime } = useTimezoneDisplay();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Selected Cities</h2>
            {timezones.length === 0 ? (
                <p>No cities selected. Use the search to add cities.</p>
            ) : (
                timezones.map(cityTimezone => (
                    <TimezoneCard
                        key={`${cityTimezone.city}-${cityTimezone.timezone}`}
                        cityTimezone={cityTimezone}
                        onRemove={removeTimezone}
                        getTime={getTimezoneTime}
                    />
                ))
            )}
        </div>
    );
};