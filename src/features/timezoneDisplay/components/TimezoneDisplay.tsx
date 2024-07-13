// src/features/timezoneDisplay/components/TimezoneDisplay.tsx

import React from 'react';
import { useTimezoneDisplay } from '../hooks/useTimezoneDisplay';
import { TimezoneDisplayProps, TimezoneCardProps } from '../types';

const TimezoneCard: React.FC<TimezoneCardProps> = ({ cityTimezone, onRemove, getTime }) => {
    const time = getTime(cityTimezone.timezone);

    return (
        <div className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-yellow-400">{cityTimezone.city}, {cityTimezone.country}</h3>
            <p className="text-sm text-gray-500">{cityTimezone.timezone}</p>
            <p className="text-2xl font-bold text-green-400">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm text-blue-400">
                {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-purple-400">
                UTC {cityTimezone.offset >= 0 ? '+' : ''}{cityTimezone.offset / 60}
            </p>
            <button
                onClick={() => onRemove(cityTimezone.id)}
                className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
                Remove
            </button>
        </div>
    );
};

export const TimezoneDisplay: React.FC<TimezoneDisplayProps> = () => {
    const { timezones, removeTimezone, getTimezoneTime } = useTimezoneDisplay();

    return (
        <div className="text-yellow-400">
            {timezones.length === 0 ? (
                <p className="text-gray-500">No cities selected. Use the search to add cities.</p>
            ) : (
                timezones.map(cityTimezone => (
                    <TimezoneCard
                        key={cityTimezone.id}
                        cityTimezone={cityTimezone}
                        onRemove={removeTimezone}
                        getTime={getTimezoneTime}
                    />
                ))
            )}
        </div>
    );
};